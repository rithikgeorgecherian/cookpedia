import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllRecipeAPI(){
    return this.http.get(`${this.SERVER_URL}/all-recipes`)
  }

  //add-testimony
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/add-testimony`, reqBody)
  }

  //register user
  registerAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/register`, reqBody)
  }

  //login user
  loginAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/login`, reqBody)
  }

  //appendtoken in req header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token) {
       headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return {headers}
  }

  //recipe/:id/view
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.SERVER_URL}/recipe/${recipeId}/view`, this.appendToken())
  }

  //related-recipes?cuisine=Pakistani
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.SERVER_URL}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }

  //recipe/67529ed63b43db7308e0d4aa/download
  downloadRecipeAPI(recipeId:string, reqBody:any){
    return this.http.post(`${this.SERVER_URL}/recipe/${recipeId}/download`,reqBody, this.appendToken())
  }

  //recipe/:id/save
  saveRecipeAPI(recipeId:string, reqBody:any){
    return this.http.post(`${this.SERVER_URL}/recipe/${recipeId}/save`,reqBody, this.appendToken())
  }

  //get-save-recipes
  getUserSaveRecipesAPI(){
    return this.http.get(`${this.SERVER_URL}/get-save-recipes`, this.appendToken())
  }

  //save-recipes/6756c5803c62874f12cb64ce/remove
  deletSaveRecipesAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/save-recipes/${id}/remove`, this.appendToken())
  }

   //get user-downloads
   getUserDownloadRecipesAPI(){
    return this.http.get(`${this.SERVER_URL}/user-downloads`,this.appendToken())
  }
   
  //edit user
  editUserAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/user/edit`,reqBody, this.appendToken())
  }

  //all-users - admin
  allUsersAPI(){
    return this.http.get(`${this.SERVER_URL}/all-users`, this.appendToken())
  }

  //download-list - admin
  allDownloadListAPI(){
    return this.http.get(`${this.SERVER_URL}/download-list`,this.appendToken())
  }

  //feedback-list - admin
  getallFeedbackListAPI(){
    return this.http.get(`${this.SERVER_URL}/all-feedback`,this.appendToken())
  }

  //feedback/6754a94f33e1a88c6dcf70d/update?status=Approved - admin
  updateFeedbackStatusAPI(feedbackId: string, status:string){
    return this.http.get(`${this.SERVER_URL}/feedback/${feedbackId}/update?status=${status}`,this.appendToken())
  }

  //all approved feedback - client
  getallApprovedFeedbackListAPI(){
    return this.http.get(`${this.SERVER_URL}/all-approve-feedback`)
  }

  //add-recipe - admin
  addRecipeAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/add-recipe`,reqBody,this.appendToken())  
  }

  //recipe/67529ed63b43db7308e0d4aa/edit
  updateRecipeAPI(id: string, reqBody:RecipeModel){
    return this.http.put(`${this.SERVER_URL}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

  //recipes/:id/remove
  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/recipes/${id}/remove`, this.appendToken())
  }

  //getChartData
  getChartData(){
    this.allDownloadListAPI().subscribe((res:any)=>{
      //code extracting cuisine and its total download count as object and added to an array
      //input : [{recipeCuisine, count}]
      //output : [{name:cuisine, y:totalCount}]

      //algorithm
      //1. create an empty array for output, object for storing each array item
      //2. get each array item of res and store its recipeCuisine & count to a variable
      //3. check recipeCuisine is variable in o/p object, 
      //   if present then set the value of recipeCuisine key as total of existing recipeCuisine value with new count,
      //   not presnt them insert recipeCuisine as key and value as its count
      //4. push each key from o/p object into o/p array
      let downloadArrayList : any = []
      let output : any = {}
      res.forEach((item:any)=>{
        //item = {recipeCuisine : "Mexican", count:4}
        let cuisine = item.recipeCuisine //cuisine = Mexican
        let currentCount = item.count //currentCount = 4
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount //output = {Mexican : 4}
        }
      })
      console.log(output);
      for(let cuisine in output){
        downloadArrayList.push({name:cuisine, y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart", JSON.stringify(downloadArrayList))
    })
  }
}
