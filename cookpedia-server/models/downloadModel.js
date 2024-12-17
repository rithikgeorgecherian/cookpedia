const mongoose = require("mongoose")

const downloadRecipeSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    recipeName:{
        type:String,
        required:true
    },
    recipeImage:{
        type:String,
        required:true
    },
    recipeCuisine:{
        type:String,
        required:true
    },
    count:{           //for storing download count in admin for analysis purpose
        type:Number,
        required:true
    },
    userId:{          //to find which user downloaded recipe and it can be shown inside his profile 
        type:String,
        required:true
    }
})

const downloadRecipes = mongoose.model("downloadRecipes", downloadRecipeSchema)

module.exports = downloadRecipes