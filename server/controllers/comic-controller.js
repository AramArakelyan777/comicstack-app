const comicService = require('../service/comic-service');

class ComicController {
    async uploadComicPages(req, res, next) {
        try {
            const { comicId } = req.params;
            const { chapter, volume } = req.body;
            const files = req.files;

            if (!files || files.length === 0) {
                return res.status(400).json({ message: "No files uploaded" });
            }

            const pages = await comicService.uploadComicPages(comicId, chapter, volume, files);

            res.status(200).json({
                message: "Comic pages uploaded successfully",
                pages,
            });
        } catch (error) {
            next(error);
        }
    }

    async getComicPages(req, res, next) {
        try {
            const { comicId } = req.params;
            const pages = await comicService.getComicPages(comicId);
            res.status(200).json(pages);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ComicController();
