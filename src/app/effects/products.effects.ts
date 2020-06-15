import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
import { GetProducts, GetProductsSuccess, GetProductsFailed, ProductsActionTypes } from '../actions/products.action';

@Injectable()
export class ProductsEffects {
  @Effect()
  public getProducts: Observable<Action>;

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {
    this.initEffects();
  }

  public initEffects(): void {
    this.getProducts = this.actions$.pipe(
      ofType<GetProducts>(ProductsActionTypes.GetProducts),
      switchMap(() =>
        this.productsService.getProducts$().pipe(
          map(data => new GetProductsSuccess(data)),
          catchError(err => of(new GetProductsFailed(err)))
        )
      ),
      share()
    );
  }
}
