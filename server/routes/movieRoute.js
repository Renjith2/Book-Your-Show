const router = require('express').Router()
const Movie=require('../Schema/moviesModel')
const authMiddleWare = require('../middlewares/authMiddleWare')

// add a new movie

router.post('/add-movie', async (req,res)=>{
    try {
        const newMovie=new Movie(req.body)
        await newMovie.save()
        res.send({
            success:true,
            message:"Movie Added Successfully!!!!"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

router.get("/get-all-movies", async (req, res) => {
    try {
      const movies = await Movie.find()
      res.send({
        success: true,
        message: "Movies fetched successfully",
        data: movies,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  })

  router.post("/update-movie", authMiddleWare, async (req, res) => {
    try {
      await Movie.findByIdAndUpdate(req.body.movieId, req.body);
      res.send({
        success: true,
        message: "Movie updated successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  router.post("/delete-movie", authMiddleWare, async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.body.movieId);
      res.send({
        success: true,
        message: "Movie deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  // get a movie by id
  router.get("/get-movie-by-id/:id", async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send({
        success: true,
        message: "Movie fetched successfully",
        data: movie,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

module.exports=router