const { PutObjectCommand, s3Client, bucketName, getPublicUrl } = require("../config/s3");
const pool = require("../db/db");
const path = require("path");


async function uploadComicPage(comicId, file, chapter, volume, pageNumber) {
    const fileName = `comics/${comicId}/page_${pageNumber}${path.extname(file.originalname)}`;
    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: fileName,
        ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const pageUrl = getPublicUrl(fileName);

    const query = `
        INSERT INTO comic_pages (comic_id, chapter, volume, page_number, page_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [comicId, chapter, volume, pageNumber, pageUrl];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

async function getComicPages(comicId) {
    const query = 'SELECT * FROM comic_pages WHERE comic_id = $1 ORDER BY chapter, volume, page_number';
    const values = [comicId];
    const { rows } = await pool.query(query, values);
    return rows;
}

module.exports = {
    uploadComicPage,
    getComicPages,
};
