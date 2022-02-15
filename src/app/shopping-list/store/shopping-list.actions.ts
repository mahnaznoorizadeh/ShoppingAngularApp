import { Action, ActionCreatorProps } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

//important: "payload" is Not a name you have to use!
// The Action interface only forces you to add a "type" property!
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredients implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: {index: number, ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT; 
   
  constructor(public payload: number) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredients | DeleteIngredient;