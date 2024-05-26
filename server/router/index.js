const Router = require("express").Router
const userController = require("../controllers/user-controller")
const commentController = require("../service/c_comment-service")
const threadController = require("../service/t_comment-service")
const filterController = require("../controllers/filter-controller")
const ratingController = require("../controllers/rating-controller")
const statusController = require("../controllers/status-controller")
const router = new Router()
const { body } = require("express-validator")
const roleMiddleware = require("../middlewares/role-middleware")
const authMiddleware = require("../middlewares/auth-middleware")
const uploadMiddleware = require("../middlewares/upload-middleware")

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 6, max: 20 }),
    userController.registration
)

router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/activate/:link", userController.activate)
router.get("/refresh", userController.refresh)
router.post("/block/:id", roleMiddleware(["ADMIN"]), userController.blockUser)
router.get("/users", authMiddleware, userController.getUsers)
router.get("/user", userController.getUser)

router.post(
    "/user/profile-picture",
    uploadMiddleware.single("profilePicture"),
    userController.uploadProfilePicture
)
router.delete("/user/profile-picture", userController.deleteProfilePicture)

//Comics
router.get("/comics", commentController.getAllComics)
router.get("/comics/:comic_id", commentController.getComic)
router.get("/top-comics", commentController.getTopComics)
router.get("/popular-comics", commentController.getPopularComics)

// Comments
router.post(
    "/comics/:comic_id/comments",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    commentController.createComment
)

router.put(
    "/comics/:comic_id/comments/:comment_id",
    roleMiddleware(["ADMIN", "MODERATOR"]),
    commentController.updateComment
)

router.delete(
    "/comics/:comic_id/comments/:comment_id",
    roleMiddleware(["ADMIN", "MODERATOR"]),
    commentController.deleteComment
)

router.post(
    "/comics/:comic_id/comments/:comment_id/like",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    commentController.likeComment
)

router.post(
    "/comics/:comic_id/comments/:comment_id/unlike",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    commentController.unlikeComment
)

router.post(
    "/rating/:comicId",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    ratingController.addRating
)

router.get("/rating/:comicId", ratingController.getRating)

router.delete(
    "/rating/:userId/:comicId",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    ratingController.deleteRating
)

//Threads
router.get("/threads", threadController.getAllThreadsWithComments)
router.get("/threads/:thread_id", threadController.getThreadWithComments)
router.post(
    "/threads",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    threadController.createThread
)
router.put(
    "/threads/:thread_id",
    roleMiddleware(["ADMIN", "MODERATOR"]),
    threadController.updateThread
)
router.delete(
    "/threads/:thread_id",
    roleMiddleware(["ADMIN", "MODERATOR"]),
    threadController.deleteThread
)

//Thread Comments
router.post(
    "/threads/:thread_id/comments",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    threadController.createThreadComment
)

router.put(
    "/threads/:thread_id/comments/:comment_id",
    roleMiddleware(["ADMIN", "MODERATOR"]),
    commentController.updateComment
)

router.delete(
    "/threads/:thread_id/comments/:comment_id",
    roleMiddleware(["ADMIN", "MODERATOR"]),
    commentController.deleteComment
)

router.post(
    "/threads/:thread_id/comments/:comment_id/like",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    commentController.likeComment
)

router.post(
    "/threads/:thread_id/comments/:comment_id/unlike",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    commentController.unlikeComment
)

// Status
router.post(
    "/status/:comicId",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    statusController.addStatus
)

router.get("/status/:comicId", statusController.getStatus)

router.delete(
    "/status/:userId/:comicId",
    roleMiddleware(["USER", "ADMIN", "MODERATOR"]),
    statusController.deleteStatus
)

// router.post(
// 	"/comics/upload",
// 	uploadMiddleware.single("file"),
// 	comicController.uploadComicPage
// )
// router.get("/comics/:comicId/pages", comicController.getComicPages)

// New filter routes
router.get("/comics/genre/:genre_id", filterController.filterComicsByGenre)
router.get("/comics/tag/:tag_id", filterController.filterComicsByTag)

module.exports = router
