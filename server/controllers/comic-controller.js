const pool = require('../db/db');
const ApiError = require('../exceptions/api-error');

class RatingController {
    async addRating(req, res, next) {
        try {
            const { comicId } = req.params;
            const { userId } = req.cookies; // Assuming you get userId from cookies
            const { rating } = req.body;

            // Check if the user has already rated this comic
            const existingRatingQuery = `
                SELECT * FROM ratings
                WHERE user_id = $1 AND comic_id = $2;
            `;
            const existingRatingResult = await pool.query(existingRatingQuery, [userId, comicId]);

            if (existingRatingResult.rows.length > 0) {
                return next(ApiError.BadRequest('You have already rated this comic.'));
            }

            const insertRatingQuery = `
                INSERT INTO ratings (user_id, comic_id, rating)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const newRatingResult = await pool.query(insertRatingQuery, [userId, comicId, rating]);

            res.json(newRatingResult.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async getRating(req, res, next) {
        try {
            const { comicId } = req.params;
            const { userId } = req.cookies; // Assuming you get userId from cookies

            const ratingQuery = `
                SELECT * FROM ratings
                WHERE user_id = $1 AND comic_id = $2;
            `;
            const ratingResult = await pool.query(ratingQuery, [userId, comicId]);

            if (ratingResult.rows.length === 0) {
                return res.status(404).send({ error: "Rating not found" });
            }

            res.json(ratingResult.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async deleteRating(req, res, next) {
        try {
            const { userId, comicId } = req.params;

            const deleteRatingQuery = `
                DELETE FROM ratings
                WHERE user_id = $1 AND comic_id = $2
                RETURNING *;
            `;
            const deleteRatingResult = await pool.query(deleteRatingQuery, [userId, comicId]);

            if (deleteRatingResult.rows.length === 0) {
                return res.status(404).send({ error: "Rating not found" });
            }

            res.json(deleteRatingResult.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async getAverageRating(req, res, next) {
        try {
            const { comicId } = req.params;

            const averageRatingQuery = `
                SELECT AVG(rating) AS average_rating
                FROM ratings
                WHERE comic_id = $1;
            `;
            const averageRatingResult = await pool.query(averageRatingQuery, [comicId]);

            const averageRating = averageRatingResult.rows[0].average_rating;
            res.json({ average_rating: averageRating ? parseFloat(averageRating).toFixed(2) : null });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RatingController();
