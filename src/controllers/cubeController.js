const router = require("express").Router()

const cubeManager = require("../managers/cubeManager")

router.get('/create', (req, res) => {
    res.render("create")
})

router.post('/create', (req, res) => {
    const {name, description, difficultyLevel, imageUrl} = req.body
    cubeManager.create({name, description, difficultyLevel: Number(difficultyLevel), imageUrl})
    res.redirect("/")
})

router.get('/:cubeId/details', (req, res) => {
    const cube = cubeManager.getOne(req.params.cubeId)

    if(!cube) {
        return res.redirect("/404")
    }

    res.render('details', {...cube})
})

module.exports = router