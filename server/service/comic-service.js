const {
	s3Client,
	PutObjectCommand,
	GetObjectCommand,
	bucketName,
	getSignedUrl,
} = require("../config/s3")
const pool = require("../db/db")
const path = require("path")

class ComicService {
	async uploadComicPages(comicId, chapter, volume, files) {
		try {
			const uploadPromises = files.map(async (file, index) => {
				const fileName = `${comicId}/${Date.now()}_${path.basename(
					file.originalname
				)}`
				const uploadParams = {
					Bucket: bucketName,
					Body: file.buffer,
					Key: `comic_pages/${fileName}`,
					ContentType: file.mimetype,
				}
				await s3Client.send(new PutObjectCommand(uploadParams))

				const imageUrl = await getSignedUrl(
					s3Client,
					new GetObjectCommand({
						Bucket: bucketName,
						Key: `comic_pages/${fileName}`,
					}),
					{ expiresIn: 6 * 24 * 60 * 60 } // URL valid for 6 days
				)

				// Save to database
				const query =
					"INSERT INTO comic_pages (comic_id, chapter, volume, page_number, page_url) VALUES ($1, $2, $3, $4, $5) RETURNING *"
				const values = [comicId, chapter, volume, index + 1, imageUrl]
				const result = await pool.query(query, values)
				return result.rows[0]
			})

			const pages = await Promise.all(uploadPromises)
			return pages
		} catch (error) {
			console.error("Error uploading comic pages:", error)
			throw error
		}
	}

	async getComicPages(comicId) {
		const query =
			"SELECT * FROM comic_pages WHERE comic_id = $1 ORDER BY volume, chapter, page_number ASC"
		const { rows } = await pool.query(query, [comicId])
		return rows
	}
}

module.exports = new ComicService()
