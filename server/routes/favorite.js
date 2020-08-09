const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {

    Favorite.find({movieId: req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            res.status(200).json({success:true, favoriteNumber:info.length})
        })
})

router.post('/favorited', (req, res) => {

    Favorite.find({userFrom:req.body.userFrom, movieId: req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            // favorite한 영화가 하나라도 있는지 확인
            let result = false
            if(info.length !== 0) result = true

            res.status(200).json({success:true, favorited:result})
        })
})


router.post('/addFavorite', (req, res) => {
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })
})


router.post('/removeFavorite', (req, res) => {
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, doc})
        })
})


router.post('/getFavorites', (req, res) => {
    Favorite.find({userFrom: req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})
        })
})


module.exports = router;
