const pool = require("../db/db.js")

async function getComicsByGenre(genreId) {
    try {
        const query = `
            SELECT c.comic_id, c.title, c.description, c.cover_image_url, c.date, c.current_status
            FROM "comics" c
            JOIN "comic_genres" cg ON c.comic_id = cg.comic_id
            WHERE cg.genre_id = $1;
        `
        const result = await pool.query(query, [genreId])
        const comics = result.rows

        for (let comic of comics) {
            const averageRatingQuery = `
                SELECT AVG(rating) AS average_rating
                FROM "ratings"
                WHERE comic_id = $1;
            `
            const averageRatingResult = await pool.query(averageRatingQuery, [
                comic.comic_id,
            ])
            const averageRating = averageRatingResult.rows[0].average_rating
            comic.average_rating = averageRating
                ? parseFloat(averageRating).toFixed(1)
                : null
        }

        return comics
    } catch (error) {
        console.error("Error fetching comics by genre:", error)
        throw error
    }
}

async function getComicsByTag(tagId) {
    try {
        const query = `
            SELECT c.comic_id, c.title, c.description, c.cover_image_url, c.date, c.current_status
            FROM "comics" c
            JOIN "comic_tags" ct ON c.comic_id = ct.comic_id
            WHERE ct.tag_id = $1;
        `
        const result = await pool.query(query, [tagId])
        const comics = result.rows

        for (let comic of comics) {
            const averageRatingQuery = `
                SELECT AVG(rating) AS average_rating
                FROM "ratings"
                WHERE comic_id = $1;
            `
            const averageRatingResult = await pool.query(averageRatingQuery, [
                comic.comic_id,
            ])
            const averageRating = averageRatingResult.rows[0].average_rating
            comic.average_rating = averageRating
                ? parseFloat(averageRating).toFixed(1)
                : null
        }

        return comics
    } catch (error) {
        console.error("Error fetching comics by tag:", error)
        throw error
    }
}

module.exports = {
    getComicsByGenre,
    getComicsByTag,
}
