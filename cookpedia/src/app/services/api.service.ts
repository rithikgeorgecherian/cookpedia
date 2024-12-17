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
}
