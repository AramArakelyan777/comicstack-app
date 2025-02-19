const userService = require("../service/user-service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")
const crypto = require("crypto")
const Jimp = require("jimp")
const path = require("path")
const {
	s3Client,
	bucketName,
	PutObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	getSignedUrl,
} = require("../config/s3")

const generateFileName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex")

const processImage = async (buffer) => {
	const image = await Jimp.read(buffer)
	image.cover(300, 300).quality(100) // Resize to 300x300 and set JPEG quality to 60%
	return await image.getBufferAsync(Jimp.MIME_JPEG)
}

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest("Validation error", errors.array())
				)
			}
			const { username, email, password } = req.body
			const userData = await userService.registration(
				username,
				email,
				password
			)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			res.cookie("userId", userData.user.user_id)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { username, email, password } = req.body
			const userData = await userService.login(username, email, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			res.cookie("userId", userData.user.user_id)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.logout(refreshToken)
			res.clearCookie("refreshToken")
			res.clearCookie("accessToken")
			res.clearCookie("userId")
			return res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.cookie("userId", userData.user.user_id)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}
	
	async getUsers(req, res, next) {
		try {
			const users = await userService.getUsers()
			return res.json(users)
		} catch (e) {
			next(e)
		}
	}

	async getUser(req, res, next) {
        try {
            const { userId } = req.cookies;

            if (!userId) {
                return res.status(401).json({ error: "Not Authorized" });
            }

            const userService = require('../service/user-service');
            const user = await userService.getUserById(userId);

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

	async blockUser(req, res, next) {
		try {
			const userId = req.params.id
			const result = await userService.blockUser(userId)
			return res.json({ message: result })
		} catch (e) {
			next(e)
		}
	}

	async uploadProfilePicture(req, res, next) {
		try {
			const { userId } = req.cookies
			const file = req.file

			const user = await userService.getUserById(userId)

			if (!file) {
				return res.status(400).json({ message: "No file uploaded" })
			}
			if (user && user.avatar_url) {
				const oldKey = user.avatar_url.split("/").pop().split("?")[0]
				const deleteParams = {
					Bucket: bucketName,
					Key: `profile_pictures/${oldKey}`,
				}
				await s3Client.send(new DeleteObjectCommand(deleteParams))
			}

			const fileName =
				generateFileName() + path.extname(file.originalname)
			const fileBuffer = await processImage(file.buffer)

			const uploadParams = {
				Bucket: bucketName,
				Body: fileBuffer,
				Key: `profile_pictures/${fileName}`,
				ContentType: file.mimetype,
			}

			const data = await s3Client.send(new PutObjectCommand(uploadParams))
			// console.log("S3 upload response:", data)
			const imageUrl = "https://d3dnlr2v42ud5k.cloudfront.net/profile_pictures/" + fileName
		

			await userService.updateProfilePicture(userId, imageUrl)

			res.status(200).json({
				message: "Profile picture uploaded successfully",
				imageUrl,
			})
		} catch (error) {
			next(error)
		}
	}

	async deleteProfilePicture(req, res, next) {
		try {
			const { userId } = req.cookies
			const user = await userService.getUserById(userId)

			if (!user.avatar_url) {
				return res
					.status(400)
					.json({ message: "No profile picture to delete" })
			}

			const key = user.avatar_url.split("/").pop().split("?")[0]

			const deleteParams = {
				Bucket: bucketName,
				Key: `profile_pictures/${key}`,
			}
			await s3Client.send(new DeleteObjectCommand(deleteParams))
			await userService.updateProfilePicture(userId, null)

			res.status(200).json({
				message: "Profile picture deleted successfully",
			})
		} catch (error) {
			next(error)
		}
	}

	async changeUsername(req, res, next) {
        try {
            const { userId } = req.cookies;
            const { newUsername } = req.body;
            if (!userId || !newUsername) {
                return res.status(400).json({ message: "User ID and new username are required" });
            }
            const result = await userService.changeUsername(userId, newUsername);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async changePassword(req, res, next) {
        try {
            const { userId } = req.cookies;
            const { currentPassword, newPassword } = req.body;
            if (!userId || !currentPassword || !newPassword) {
                return res.status(400).json({ message: "User ID, current password, and new password are required" });
            }
            const result = await userService.changePassword(userId, currentPassword, newPassword);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async deleteAccount(req, res, next) {
        try {
            const { userId } = req.cookies;
            if (!userId) {
                return res.status(401).json({ message: "Not authorized" });
            }
            const result = await userService.deleteAccount(userId);
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            res.clearCookie("userId");
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController()
