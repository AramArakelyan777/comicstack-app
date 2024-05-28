const pool = require("../db/db.js")
const { updateThreadCommentCount } = require("./t_comment-service.js")
const Filter = require("bad-words")

const filter = new Filter()
const words = require("../middlewares/extra-words.json")
filter.addWords(...words)

//All comics
async function getAllComics(req, res) {
	try {
		const query = `
            SELECT comic_id, title, description, cover_image_url, date, current_status FROM "comics";
        `
		const result = await pool.query(query)
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

		res.json(comics)
	} catch (error) {
		console.error("Error fetching comics:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

async function getComic(req, res) {
	try {
		const comicQuery = `
            SELECT comic_id, title, author, description, cover_image_url, date, current_status
			FROM "comics"
            WHERE comic_id = $1;
        `
		const comicResult = await pool.query(comicQuery, [req.params.comic_id])
		const comic = comicResult.rows[0]

		if (!comic) {
			return res.status(404).send({ error: "Comic not found" })
		}

		const genresQuery = `
            SELECT g.genre_id, g.genre_name
            FROM "comic_genres" cg
            JOIN "genres" g ON cg.genre_id = g.genre_id
            WHERE cg.comic_id = $1;
        `
		const genresResult = await pool.query(genresQuery, [
			req.params.comic_id,
		])
		const genres = genresResult.rows

		const tagsQuery = `
            SELECT t.tag_id, t.tag_name
            FROM "comic_tags" ct
            JOIN "tags" t ON ct.tag_id = t.tag_id
            WHERE ct.comic_id = $1;
        `
		const tagsResult = await pool.query(tagsQuery, [req.params.comic_id])
		const tags = tagsResult.rows

		const commentsQuery = `
            SELECT c.comment_id, c.messages, c.parent_id, c.user_id, c.created_at
            FROM "cs_comments" c
            WHERE c.comic_id = $1
            ORDER BY created_at DESC;
        `
		const commentsResult = await pool.query(commentsQuery, [
			req.params.comic_id,
		])
		const comments = commentsResult.rows

		for (let comment of comments) {
			const userQuery = `
                SELECT user_id, username, avatar_url
                FROM "users"
                WHERE user_id = $1;
            `
			const userResult = await pool.query(userQuery, [comment.user_id])
			const user = userResult.rows[0]
			comment.user = user

			const likeCountResult = await pool.query(
				'SELECT COUNT(*) FROM "likes" WHERE comment_id = $1',
				[comment.comment_id]
			)
			comment.like_count = parseInt(likeCountResult.rows[0].count)

			const likeQuery = `
            SELECT c.user_id, l.comment_id
            FROM likes l
            INNER JOIN cs_comments c ON l.comment_id = c.comment_id
            WHERE l.user_id = $2
            AND l.comment_id = $1;
            `
			const likeResult = await pool.query(likeQuery, [
				comment.comment_id,
				req.cookies.userId,
			])
			comment.liked_by_me = likeResult.rows.length > 0
		}
		// Calculate rating counts and total votes
		const ratingsQuery = `
            SELECT rating, COUNT(*) AS count
            FROM ratings
            WHERE comic_id = $1
            GROUP BY rating;
        `
		const ratingsResult = await pool.query(ratingsQuery, [
			req.params.comic_id,
		])
		const ratingCounts = ratingsResult.rows

		const totalVotesQuery = `
            SELECT COUNT(*) AS total_votes, SUM(rating) AS sum_ratings
            FROM ratings
            WHERE comic_id = $1;
        `
		const totalVotesResult = await pool.query(totalVotesQuery, [
			req.params.comic_id,
		])
		const { total_votes } = totalVotesResult.rows[0]

		const averageRatingQuery = `
		SELECT AVG(rating) AS average_rating
		FROM "ratings"
		WHERE comic_id = $1;
	`

		const averageRatingResult = await pool.query(averageRatingQuery, [
			req.params.comic_id,
		])
		const averageRating = averageRatingResult.rows[0].average_rating
		comic.average_rating = averageRating
			? parseFloat(averageRating).toFixed(1)
			: null

		comic.rating_counts = ratingCounts
		comic.total_votes = parseInt(total_votes)

		comic.comments = comments
		comic.genres = genres
		comic.tags = tags

		await updateThreadCommentCount(req.params.thread_id)

		res.json(comic)
	} catch (error) {
		console.error("Error fetching comic:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

async function getTopComics(req, res) {
	try {
		const query = `
        SELECT c.comic_id, c.title, c.cover_image_url, c.date, 
               AVG(r.rating) AS average_rating, 
               COUNT(r.rating) AS rating_count
        FROM comics c
        JOIN ratings r ON c.comic_id = r.comic_id
        WHERE date_trunc('month', r.created_at) = date_trunc('month', CURRENT_DATE)
        GROUP BY c.comic_id
        ORDER BY average_rating DESC, rating_count DESC
        LIMIT 6;
    `
		const result = await pool.query(query)
		const topComics = result.rows

		for (let comic of topComics) {
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

		res.json(topComics)
	} catch (error) {
		console.error("Error fetching top comics:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

async function getPopularComics(req, res) {
	try {
		const query = `
            SELECT c.comic_id, c.title, c.cover_image_url, c.date, COUNT(cs.comment_id) as comment_count
            FROM comics c
            LEFT JOIN cs_comments cs ON c.comic_id = cs.comic_id
            GROUP BY c.comic_id
            ORDER BY comment_count DESC
            LIMIT 6;
        `

		const result = await pool.query(query)
		const popularComics = result.rows

		for (let comic of popularComics) {
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

		res.json(popularComics)
	} catch (error) {
		console.error("Error fetching popular comics:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

// Function to create a comment
async function createComment(req, res) {
	const { message, parent_id } = req.body

	if (!message) {
		return res.status(400).send({ error: "Message is required" })
	}

	if (filter.isProfane(message)) {
		return res
			.status(400)
			.send({ message: "Message contains inappropriate language." })
	}

	try {
		const comic_id = req.params.comic_id
		const query = `
            INSERT INTO "cs_comments" ("messages", "user_id", "comic_id", "parent_id","parent_type", "like_count", "created_at")
            VALUES ($1, $2, $3, $4,'comic', $5, NOW() AT TIME ZONE 'UTC')
            RETURNING *;
        `
		const values = [message, req.cookies.userId, comic_id, parent_id, 0]
		const result = await pool.query(query, values)

		const newComment = result.rows[0]

		// Fetch user details for the new comment
		const userQuery = `
            SELECT user_id, username, avatar_url
            FROM "users"
            WHERE user_id = $1;
        `
		const userResult = await pool.query(userQuery, [newComment.user_id])
		const user = userResult.rows[0]

		newComment.user = user
		await updateThreadCommentCount(req.params.thread_id)

		res.json(newComment)
	} catch (error) {
		console.error("Error creating comment:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

// Function to update a comment
async function updateComment(req, res) {
	const { message } = req.body
	if (!message) {
		return res.status(400).send({ error: "Message is required" })
	}

	if (filter.isProfane(message)) {
		return res
			.status(400)
			.send({ message: "Message contains inappropriate language." })
	}

	try {
		const { user_id } = await pool.query(
			'SELECT "user_id" FROM "cs_comments" WHERE comment_id = $1',
			[req.params.comment_id]
		)
		if (user_id !== req.cookies.user_id) {
			return res.status(401).send({
				error: "You do not have permission to edit this comment",
			})
		}

		const query = `
            UPDATE "cs_comments"
            SET "messages" = $1
            WHERE comment_id = $2
            RETURNING *;
        `
		const values = [message, req.params.comment_id]
		const result = await pool.query(query, values)
		const updatedComment = result.rows[0]
		await updateThreadCommentCount(req.params.thread_id)
		res.json(updatedComment)
	} catch (error) {
		console.error("Error updating comment:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

// Function to delete a comment
async function deleteComment(req, res) {
	try {
		const { user_id } = await pool.query(
			'SELECT "user_id" FROM "cs_comments" WHERE comment_id = $1',
			[req.params.comment_id]
		)
		if (user_id !== req.cookies.user_id) {
			return res.status(401).send({
				error: "You do not have permission to delete this comment",
			})
		}

		await pool.query('DELETE FROM "cs_comments" WHERE comment_id = $1', [
			req.params.comment_id,
		])
		await updateThreadCommentCount(req.params.thread_id)
		res.status(204).send()
	} catch (error) {
		console.error("Error deleting comment:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

async function likeComment(req, res) {
	try {
		const { comment_id } = req.params
		const { userId } = req.cookies

		// Check if the user has already liked the comment
		const existingLike = await pool.query(
			'SELECT 1 FROM "likes" WHERE comment_id = $1 AND user_id = $2',
			[comment_id, userId]
		)

		if (existingLike.rows.length > 0) {
			return res
				.status(400)
				.json({ error: "You have already liked this comment" })
		}

		// Insert a new like
		await pool.query(
			'INSERT INTO "likes" (user_id, comment_id) VALUES ($1, $2)',
			[userId, comment_id]
		)
		// Update like_count in comments table
		await updateLikeCount(comment_id)
		await updateThreadCommentCount(req.params.thread_id)
		res.status(200).send()
	} catch (error) {
		console.error("Error liking comment:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

async function unlikeComment(req, res) {
	try {
		const { comment_id } = req.params
		const { userId } = req.cookies

		// Check if the user has liked the comment
		const existingLike = await pool.query(
			'SELECT 1 FROM "likes" WHERE comment_id = $1 AND user_id = $2',
			[comment_id, userId]
		)

		if (existingLike.rows.length === 0) {
			return res
				.status(400)
				.json({ error: "You have not liked this comment" })
		}

		// Remove the like
		await pool.query(
			'DELETE FROM "likes" WHERE comment_id = $1 AND user_id = $2',
			[comment_id, userId]
		)
		// Update like_count in comments table
		await updateLikeCount(comment_id)
		await updateThreadCommentCount(req.params.thread_id)
		res.status(200).send()
	} catch (error) {
		console.error("Error unliking comment:", error)
		res.status(500).send({ error: "Internal server error" })
	}
}

async function updateLikeCount(comment_id) {
	const likeCountResult = await pool.query(
		'SELECT COUNT(*) FROM "likes" WHERE comment_id = $1',
		[comment_id]
	)
	const likeCount = parseInt(likeCountResult.rows[0].count)

	await pool.query(
		'UPDATE "cs_comments" SET like_count = $1 WHERE comment_id = $2',
		[likeCount, comment_id]
	)
}

module.exports = {
	getAllComics,
	getComic,
	getTopComics,
	getPopularComics,
	createComment,
	updateComment,
	deleteComment,
	unlikeComment,
	likeComment,
}
