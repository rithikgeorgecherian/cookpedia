import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {
   //create a property to store array of saved recipes
   allRecipes:any = []

   //apiservice dependency injection
   constructor(private api:ApiService){}

   //call the function inside ngOnInit
   ngOnInit(){
    this.getAllSavedRecipes()
   }

   //define a function for calling saveRecipe api using apiService
   getAllSavedRecipes(){
    this.api.getUserSaveRecipesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
    })
   }

   //remove recipe
   removeSaveRecipe(id:string){
    this.api.deletSaveRecipesAPI(id).subscribe((res:any)=>{
        this.getAllSavedRecipes()
    })
   }
   
}
