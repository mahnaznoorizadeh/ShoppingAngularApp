import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Observable<{ ingredients: Ingredient[] }>
  private igChangedSub: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[] }}>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.slService.getIngredients();
    // this.igChangedSub = this.slService.ingredientsChanged.
    //   subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  onIngrediantAdded(ingredient: Ingredient) {
   //this.ingredients.push(ingredient);
  }

  ngOnDestroy(): void {
      this.igChangedSub.unsubscribe();
  }

}
