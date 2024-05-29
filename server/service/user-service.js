const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")
const pool = require("../db/db")
const Filter = require("bad-words")

const filter = new Filter()
const words = require("../middlewares/extra-words.json")
filter.addWords(...words)

class UserService {
    async registration(username, email, password) {
        try {
            const emailQuery = "SELECT * FROM users WHERE email = $1"
            const usernameQuery = "SELECT * FROM users WHERE username = $1"

            const emailResult = await pool.query(emailQuery, [email])
            const usernameResult = await pool.query(usernameQuery, [username])

            if (emailResult.rows.length > 0) {
                // 409 code
                throw ApiError.ConflictError(
                    `User with email ${email} already exists`
                )
            }

            if (usernameResult.rows.length > 0) {
                //409 code
                throw ApiError.ConflictError(
                    `User with username ${username} already exists`
                )
            }

            if (filter.isProfane(username)) {
                // 400 code
                throw ApiError.BadRequest(
                    "Username contains inappropriate language."
                )
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const activationLink = uuidv4() // Use UUID for activation link

            const insertQuery = `
                INSERT INTO users (username, email, password_hash, current_roles, avatar_url, is_activated, activation_link) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING *
            `
            const insertResult = await pool.query(insertQuery, [
                username,
                email,
                hashPassword,
                "USER",
                "",
                false,
                activationLink,
            ])

            await mailService.sendActivationMail(
                email,
                `${process.env.API_URL}/api/activate/${activationLink}`
            )

            const userDto = new UserDto(insertResult.rows[0]) // Assuming UserDto constructor accepts an object

            const tokens = tokenService.generateTokens({ ...userDto })

            await tokenService.saveToken(userDto.user_id, tokens.refreshToken)

            return { ...tokens, user: { ...userDto, isActivated: false } }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    //Activationlink init
    async activate(activationLink) {
        try {
            const query = "SELECT * FROM users WHERE activation_link = $1"
            const result = await pool.query(query, [activationLink])

            if (!result.rows.length) {
                throw ApiError.BadRequest("Invalid activation link")
            }

            // Update user activation status
            const user = result.rows[0]
            const updateQuery =
                "UPDATE users SET is_activated = true WHERE user_id = $1"
            await pool.query(updateQuery, [user.user_id])

            return "User activated successfully"
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async login(username, email, password) {
        try {
            const query =
                "SELECT * FROM users WHERE email = $1 OR username = $2"
            const result = await pool.query(query, [email, username])

            if (!result.rows.length) {
                throw ApiError.BadRequest(
                    "User with this email/username does not exist"
                )
            }

            const user = result.rows[0]

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password_hash
            )
            if (!isPasswordValid) {
                throw ApiError.BadRequest("Invalid password")
            }

            // Create UserDto
            const userDto = new UserDto(user)

            // Generate tokens
            const tokens = tokenService.generateTokens({ ...userDto })

            // Save refresh token
            await tokenService.saveToken(userDto.user_id, tokens.refreshToken)

            return {
                ...tokens,
                user: { ...userDto, isActivated: user.is_activated },
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async logout(refreshToken) {
        try {
            await tokenService.removeToken(refreshToken)
            return "Logout successful"
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw ApiError.UnauthorizedError("Invalid refresh token")
            }

            // Validate refresh token
            const userData = tokenService.validateRefreshToken(refreshToken)
            // Check if token exists in database
            const tokenFromDb = await tokenService.findToken(refreshToken)
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError("Invalid refresh token")
            }

            // Find user by id
            const userQuery = "SELECT * FROM users WHERE user_id = $1"
            const userResult = await pool.query(userQuery, [userData.user_id])

            if (!userResult.rows.length) {
                throw ApiError.UnauthorizedError("User not found")
            }

            const user = userResult.rows[0]

            // Create UserDto
            const userDto = new UserDto(user)

            // Generate tokens
            const tokens = tokenService.generateTokens({ ...userDto })

            // Save refresh token
            await tokenService.saveToken(userDto.user_id, tokens.refreshToken)

            return {
                ...tokens,
                user: { ...userDto, isActivated: user.is_activated },
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async blockUser(userId) {
        try {
            // Fetch user details from the database
            const query = "SELECT * FROM users WHERE user_id = $1"
            const result = await pool.query(query, [userId])
            const user = result.rows[0]

            if (!user) {
                throw ApiError.NotFoundError("User not found")
            }

            // Create a UserDto instance from the fetched user details
            const userDto = new UserDto(user)

            // Update the is_activated status of the user to false
            const updateQuery =
                "UPDATE users SET is_activated = false WHERE user_id = $1"
            await pool.query(updateQuery, [userDto.user_id])

            return "User blocked successfully"
        } catch (error) {
            throw new Error(error.message)
        }
    }

	async updateProfilePicture(userId, imageUrl) {
		const query = "UPDATE users SET avatar_url = $1 WHERE user_id = $2"
		const values = [imageUrl, userId]
        const { rows } = await pool.query(query, values);
        const user = rows[0];
    
		if (user && user.avatar_url) {
			user.avatar_url = "https://d3dnlr2v42ud5k.cloudfront.net/profile_pictures/"
		}

        return user
    }

    async getUserById(userId) {
        try {
            const userQuery = `
				SELECT user_id, username, email, avatar_url, is_activated, created_at
				FROM users
				WHERE user_id = $1;
			`
            const userResult = await pool.query(userQuery, [userId])
            const user = userResult.rows[0]

            if (!user) {
                throw new Error("User not found")
            }

            const statusesQuery = `
				SELECT s.comic_id, s.status, c.title, c.cover_image_url
				FROM statuses s
				JOIN comics c ON s.comic_id = c.comic_id
				WHERE s.user_id = $1;
			`
            const statusesResult = await pool.query(statusesQuery, [userId])
            user.statuses = statusesResult.rows

            return user
        } catch (error) {
            console.error("Error fetching user by ID:", error)
            throw error
        }
    }

    async getUsers() {
        const query = "SELECT * FROM users"
        const { rows } = await pool.query(query)
        return rows[0]
    }
	
	async changeUsername(userId, newUsername) {
        try {
            // Check if new username is same as the current username
            const currentUsernameQuery = "SELECT username FROM users WHERE user_id = $1";
            const currentUsernameResult = await pool.query(currentUsernameQuery, [userId]);
            if (!currentUsernameResult.rows.length) {
                throw ApiError.NotFoundError("User not found");
            }
            const currentUsername = currentUsernameResult.rows[0].username;
            if (currentUsername === newUsername) {
                throw ApiError.BadRequest("New username cannot be the same as the current username");
            }

            // Check if new username already exists
            const existingUsernameQuery = "SELECT * FROM users WHERE username = $1";
            const existingUsernameResult = await pool.query(existingUsernameQuery, [newUsername]);
            if (existingUsernameResult.rows.length > 0) {
                throw ApiError.ConflictError("Username already exists");
            }

            // Check for inappropriate language
            if (filter.isProfane(newUsername)) {
                throw ApiError.BadRequest("Username contains inappropriate language.");
            }

            // Update username
            const updateUsernameQuery = "UPDATE users SET username = $1 WHERE user_id = $2";
            await pool.query(updateUsernameQuery, [newUsername, userId]);
            return { message: "Username updated successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async changePassword(userId, currentPassword, newPassword) {
        try {
            // Fetch current password hash from the database
            const userQuery = "SELECT password_hash FROM users WHERE user_id = $1";
            const userResult = await pool.query(userQuery, [userId]);
            if (!userResult.rows.length) {
                throw ApiError.NotFoundError("User not found");
            }
            const currentPasswordHash = userResult.rows[0].password_hash;

            // Check if current password matches
            const isPasswordValid = await bcrypt.compare(currentPassword, currentPasswordHash);
            if (!isPasswordValid) {
                throw ApiError.BadRequest("Current password is incorrect");
            }

            // Hash new password and update it in the database
            const newHashPassword = await bcrypt.hash(newPassword, 10);
            const updatePasswordQuery = "UPDATE users SET password_hash = $1 WHERE user_id = $2";
            await pool.query(updatePasswordQuery, [newHashPassword, userId]);
            return { message: "Password updated successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteAccount(userId) {
        try {
            // Delete user from the database
            const deleteUserQuery = "DELETE FROM users WHERE user_id = $1";
            await pool.query(deleteUserQuery, [userId]);
            return { message: "User account deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new UserService()
