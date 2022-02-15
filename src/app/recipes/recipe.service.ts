import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Schnitzal', 
    //                'A supe-tasty Schnitzal - just awesome!', 
    //                'https://www.seasonsandsuppers.ca/wp-content/uploads/2019/10/pork-schnitzel-4-3.jpg',
    //                [
    //                    new Ingredient('Meet', 1),
    //                    new Ingredient('French Fries', 20)
    //                ]
    //             ),
    //     new Recipe('Big Fat Burger', 
    //                'What else you need to stay?', 
    //                'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F07%2F13%2FUltimate-Veggie-Burgers-FT-Recipe-0821.jpg',
    //                [
    //                    new Ingredient('Buns', 2),
    //                    new Ingredient('Meet', 1)
    //                ]
    //             )
    // ];
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice(); //copy of a array
    }

    getRecipe(index: number) {
        return this.recipes[index]; 
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        //this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) { 
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) { 
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}