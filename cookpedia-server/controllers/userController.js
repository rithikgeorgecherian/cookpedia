const users =  require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// add user
exports.addUserController = async (req,res)=>{
    console.log( "inside addUserController");
    const {username, email, password} = req.body
   try{
      const exisitingUser = await users.findOne({email})
      if(exisitingUser){
         res.status(406).json("User already exist...Please Login")
       }else{
        const encryptedPassword = await bcrypt.hash(password, 10) 
        const newUser = new users({
           username, email, password : encryptedPassword, profilePic:""
        })
        await newUser.save()
        res.status(200).json(newUser)
        }
     }catch(err){
          res.status(401).json(err)
     }
   }

//login
exports.loginController = async (req,res)=>{
    console.log( "inside loginController");
    const {email, password} = req.body
   try{
      const existingEmail = await users.findOne({email})
      if(existingEmail){
           let isUserPaswdMatch = await bcrypt.compare(password, existingEmail.password)
             if(isUserPaswdMatch || password==existingEmail.password){
                const token = jwt.sign({userId: existingEmail._id}, process.env.JWTPASSWORD)
                res.status(200).json({user:existingEmail, token})
             }else{
                res.status(404).json("Invalid Password")
             }
      }else{
        res.status(404).json("Invalid Email/Password")
      }
     }catch(err){
        res.status(401).json(err)
     }
   } 

//edit user
exports.editUserController = async (req,res)=>{
   console.log( "inside editUserController");
   const {profilePic} = req.body
  try{
    const exisitingUser = await users.findById({_id:userId})
    exisitingUser.profilePic = profilePic 
    await exisitingUser.save()
    res.status(200).json(exisitingUser)
    }catch(err){
       res.status(401).json(err)
    }
  } 


  //get all users
  exports.getAllUsersController = async (req,res) => {
   console.log("Inside getAllUsersController");
   try{
     const allUsers = await users.find({role:"User"})
     res.status(200).json(allUsers)
   }catch(err){
      res.status(401).json(err)
   }
   
  }