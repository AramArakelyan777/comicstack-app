const filterService = require('../service/filter-service');

async function filterComicsByGenre(req, res) {
    try {
        const genreId = req.params.genre_id;
        const comics = await filterService.getComicsByGenre(genreId);
        res.json(comics);
    } catch (error) {
        console.error("Error fetching comics by genre:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}

async function filterComicsByTag(req, res) {
    try {
        const tagId = req.params.tag_id;
        const comics = await filterService.getComicsByTag(tagId);
        res.json(comics);
    } catch (error) {
        console.error("Error fetching comics by tag:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}

module.exports = {
    filterComicsByGenre,
    filterComicsByTag,
};
