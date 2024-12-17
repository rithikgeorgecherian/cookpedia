const express = require('express')
const recipeController = require("../controllers/recipeController")
const testimonyController = require('../controllers/testimonyController')
const userController = require("../controllers/userController")
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const downloadRecipeController = require("../controllers/downloadRecipeController")
const saveRecipeController = require("../controllers/saveRecipeController")


const router = new express.Router()

//all recipes
router.get("/all-recipes", recipeController.getAllRecipeController)

//add-testimony
router.post("/add-testimony", testimonyController.addTestimonyController)

//register user
router.post("/register", userController.addUserController)

//login user
router.post("/login", userController.loginController)

//view single recipes
router.get("/recipe/:id/view",jwtMiddleware, recipeController.getARecipeController)

//related recipes
router.get("/related-recipes",jwtMiddleware, recipeController.relatedRecipeController)

//download recipes
router.post("/recipe/:id/download",jwtMiddleware, downloadRecipeController.addToDownloadRecipeController)

///save to collection
router.post("/recipe/:id/save",jwtMiddleware, saveRecipeController.addToSaveRecipeController)

///get user saved recipe
router.get("/get-save-recipes",jwtMiddleware, saveRecipeController.getUserSavedRecipeController)

///delete user saved recipe
router.delete("/save-recipes/:id/remove",jwtMiddleware, saveRecipeController.removeSavedRecipeController)

//get  user download recipes
router.get("/user-downloads",jwtMiddleware, downloadRecipeController.getUserDownloadListController)

//edit user
router.post("/user/edit",jwtMiddleware, userController.editUserController)

//all-user - admin
router.get("/all-users", jwtMiddleware, userController.getAllUsersController)

//get all download recipes - admin
router.get("/download-list",jwtMiddleware, downloadRecipeController.getAllDownloadListController)

//get all feedback - admin
router.get("/all-feedback",jwtMiddleware, testimonyController.getAllFeedbackController)

//update testimony - admin
router.get("/feedback/:id/update",jwtMiddleware, testimonyController.updateFeedbackStatusController)

//get all approved feedback - client
router.get("/all-approve-feedback", testimonyController.getAllApprovedFeedbackController)

//add recipe - admin
router.post("/add-recipe",jwtMiddleware, recipeController.addRecipeController)

//edit recipe - admin
router.put("/recipe/:id/edit",jwtMiddleware, recipeController.updateRecipeController)

///delete recipe
router.delete("/recipes/:id/remove",jwtMiddleware, recipeController.removeRecipeController)

module.exports = router