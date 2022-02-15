import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListAction from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
}

//state is immutable, then we cannot push, so we should make a copy and ,...
export function shoppingListReducer(state = initialState, action: ShoppingListAction.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListAction.ADD_INGREDIENT: //identifire
    return {
      ...state, //copy all the state 
      ingredients: [...state.ingredients, action.payload] //then change te ingredients 
    };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
      case ShoppingListAction.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[action.payload.index];
        const updatedIngredient = {
          ...ingredient,
          ...action.payload.ingredient
        }
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.payload.index] = updatedIngredient;
        return {
          ...state,
          ingredients: updatedIngredients
        };
        case ShoppingListAction.DELETE_INGREDIENT:
          return {
            ...state,
            ingredients: state.ingredients.filter((ig, igIndex)  => {
              return igIndex !== action.payload;
            })
          };
    default:
      return state;
  }
  
}