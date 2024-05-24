const pool = require("../db/db")
const ApiError = require("../exceptions/api-error")

class RatingController {
    async addRating(req, res, next) {
        try {
            const { comicId } = req.params
            const { userId } = req.cookies
            const { rating } = req.body

            // Check if the user has already rated this comic
            const existingRatingQuery = `
                SELECT * FROM ratings
                WHERE user_id = $1 AND comic_id = $2;
            `
            const existingRatingResult = await pool.query(existingRatingQuery, [
                userId,
                comicId,
            ])

            if (existingRatingResult.rows.length > 0) {
                // Update existing rating
                const updateRatingQuery = `
                    UPDATE ratings
                    SET rating = $1
                    WHERE user_id = $2 AND comic_id = $3
                    RETURNING *;
                `
                const updatedRatingResult = await pool.query(
                    updateRatingQuery,
                    [rating, userId, comicId]
                )
                return res.json(updatedRatingResult.rows[0])
            } else {
                // Insert new rating
                const insertRatingQuery = `
                    INSERT INTO ratings (user_id, comic_id, rating)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                `
                const newRatingResult = await pool.query(insertRatingQuery, [
                    userId,
                    comicId,
                    rating,
                ])
                return res.json(newRatingResult.rows[0])
            }
        } catch (error) {
            next(error)
        }
    }

    async getRating(req, res, next) {
        try {
            const { comicId } = req.params
            const { userId } = req.cookies

            const ratingQuery = `
                SELECT * FROM ratings
                WHERE user_id = $1 AND comic_id = $2;
            `
            const ratingResult = await pool.query(ratingQuery, [
                userId,
                comicId,
            ])

            if (ratingResult.rows.length === 0) {
                return res.status(404).send({ error: "Rating not found" })
            }

            res.json(ratingResult.rows[0])
        } catch (error) {
            next(error)
        }
    }

    async deleteRating(req, res, next) {
        try {
            const { comicId } = req.params
            const { userId } = req.cookies

            const deleteRatingQuery = `
                DELETE FROM ratings
                WHERE user_id = $1 AND comic_id = $2
                RETURNING *;
            `
            const deleteRatingResult = await pool.query(deleteRatingQuery, [
                userId,
                comicId,
            ])

            if (deleteRatingResult.rows.length === 0) {
                return res.status(404).send({ error: "Rating not found" })
            }

            res.json(deleteRatingResult.rows[0])
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RatingController()
