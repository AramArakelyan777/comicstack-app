const pool = require("../db/db")
const ApiError = require("../exceptions/api-error")

class StatusController {
	async addStatus(req, res, next) {
		try {
			const { comicId } = req.params
			const { userId } = req.cookies
			const { status } = req.body

			// Check if the user has already set a status for this comic
			const existingStatusQuery = `
                SELECT * FROM statuses
                WHERE user_id = $1 AND comic_id = $2;
            `
			const existingStatusResult = await pool.query(existingStatusQuery, [
				userId,
				comicId,
			])

			if (existingStatusResult.rows.length > 0) {
				// Update existing status
				if (existingStatusResult.rows[0].status === status) {
					// If the status is the same, delete the status
					const deleteStatusQuery = `
                        DELETE FROM statuses
                        WHERE user_id = $1 AND comic_id = $2
                        RETURNING *;
                    `
					const deleteStatusResult = await pool.query(
						deleteStatusQuery,
						[userId, comicId]
					)
					return res.json({
						message: "Status deleted",
						deletedStatus: deleteStatusResult.rows[0],
					})
				} else {
					const updateStatusQuery = `
                        UPDATE statuses
                        SET status = $1
                        WHERE user_id = $2 AND comic_id = $3
                        RETURNING *;
                    `
					const updatedStatusResult = await pool.query(
						updateStatusQuery,
						[status, userId, comicId]
					)
					return res.json(updatedStatusResult.rows[0])
				}
			} else {
				// Insert new status
				const insertStatusQuery = `
                    INSERT INTO statuses (user_id, comic_id, status)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                `
				const newStatusResult = await pool.query(insertStatusQuery, [
					userId,
					comicId,
					status,
				])
				return res.json(newStatusResult.rows[0])
			}
		} catch (error) {
			next(error)
		}
	}

	async getStatus(req, res, next) {
		try {
			const { comicId } = req.params
			const { userId } = req.cookies

			const statusQuery = `
                SELECT * FROM statuses
                WHERE user_id = $1 AND comic_id = $2;
            `
			const statusResult = await pool.query(statusQuery, [
				userId,
				comicId,
			])

            if (statusResult.rows.length === 0) {
                return res.status(200).send({ status: "N/A" });
            }

			res.json(statusResult.rows[0])
		} catch (error) {
			next(error)
		}
	}

	async deleteStatus(req, res, next) {
		try {
			const { comicId } = req.params
			const { userId } = req.cookies

			const deleteStatusQuery = `
                DELETE FROM statuses
                WHERE user_id = $1 AND comic_id = $2
                RETURNING *;
            `
			const deleteStatusResult = await pool.query(deleteStatusQuery, [
				userId,
				comicId,
			])

			if (deleteStatusResult.rows.length === 0) {
				return res.status(404).send({ error: "Status not found" })
			}

			res.json(deleteStatusResult.rows[0])
		} catch (error) {
			next(error)
		}
	}
}
module.exports = new StatusController()
