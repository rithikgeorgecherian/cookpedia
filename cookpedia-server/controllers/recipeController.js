const recipes = require('../models/recipeModel')

// get all recipes
exports.getAllRecipeController = async (req, res)=>{
 console.log("Inside getAllRecipeController");
 try{
  const allRecipes = await recipes.find()
  res.status(200).json (allRecipes)
 }catch(err) {
  res.status(401).json(err)
 }
}

//getARecipe - authorized user

exports.getARecipeController = async (req, res)=>{
     console.log("Inside getARecipeController");
    //get dynamic values from url
     const {id} = req.params
    try{
     const recipeDetails = await recipes.findById({_id : id})
     res.status(200).json(recipeDetails)
    }catch(err){
     res.status(401).json(err)
    }
}    

//related recipe

exports.relatedRecipeController = async (req, res ) => {
    console.log("Inside relatedRecipeController");
    const cuisine =  req.query.cuisine
    try{
      const allRelatedRecipes = await recipes.find({cuisine})
      res.status(200).json(allRelatedRecipes)
    }catch(err){
      res.status(401).json(err)
    }
    
}

//addRecipe - admin
exports.addRecipeController = async (req, res) => {
  console.log("Inside addRecipeController");
  //1. get all data from req body
  const {name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings,  difficulty, cuisine,  caloriesPerServing, image,  mealType} = req.body
  try{
    //2. check recipe already in model
    const existingRecipe = await recipes.findOne({name})
    if(existingRecipe){
      //3. recipe already exist
      res.status(406).json("Recipe already exist in our collection!!! Add Another...")
    }else{
      //4. Recipe not in model then insert the recipe
      const newRecipe = new recipes({
        name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings,  difficulty, cuisine,  caloriesPerServing, image,  mealType
      })
      await newRecipe.save()
      res.status(200).json(newRecipe)
    }
  }catch(err){
    res.status(401).json(err)
  }
}

//updateRecipe - admin
exports.updateRecipeController = async (req, res) => {
  console.log("Inside updateRecipeController");

  // get id of recipe should be updated
  const {id} = req.params

  // get update recipe details from req body
  const {name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings,  difficulty, cuisine,  caloriesPerServing, image,  mealType} = req.body
 
  try{
      //4. Update recipe - findByIdandUpdate
      const updateRecipe = await recipes.findByIdAndUpdate({_id:id},{
        name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings,  difficulty, cuisine,  caloriesPerServing, image,  mealType
      }, {new:true})
      await updateRecipe.save()
      res.status(200).json(updateRecipe)
    }catch(err){
    res.status(401).json(err)
  }
}

//deleteRecipe 
exports.removeRecipeController = async (req, res) => {
  console.log("removeRecipeController");
  //get recipe id
  const {id} = req.params
  //remove recipe from model - findByIdandDelete
  try{
    const removeRecipe = await recipes.findByIdAndDelete({_id:id})
    res.status(200).json(removeRecipe)
  }catch(err){
    res.status(401).json(err)
  }
}

