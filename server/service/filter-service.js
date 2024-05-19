const pool = require('../db/db.js');

async function getComicsByGenre(genreId) {
    try {
        const query = `
            SELECT c.comic_id, c.title, c.description, c.cover_image_url, c.date, c.current_status, c.created_at
            FROM "comics" c
            JOIN "comic_genres" cg ON c.comic_id = cg.comic_id
            WHERE cg.genre_id = $1;
        `;
        const result = await pool.query(query, [genreId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching comics by genre:", error);
        throw error;
    }
}

async function getComicsByTag(tagId) {
    try {
        const query = `
            SELECT c.comic_id, c.title, c.description, c.cover_image_url, c.date, c.current_status, c.created_at
            FROM "comics" c
            JOIN "comic_tags" ct ON c.comic_id = ct.comic_id
            WHERE ct.tag_id = $1;
        `;
        const result = await pool.query(query, [tagId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching comics by tag:", error);
        throw error;
    }
}

module.exports = {
    getComicsByGenre,
    getComicsByTag,
};
