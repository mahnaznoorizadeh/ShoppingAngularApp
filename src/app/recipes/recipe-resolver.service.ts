import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";

import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> { //which type of data we resolve in the end
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   const recipes = this.recipeService.getRecipes();
   if(recipes.length === 0) {
     return this.dataStorageService.fetchRecipes();   //we don't need to add subscribe method, becuase Resolve will do that by itself
   } else {
       return recipes;
   }
  }

}