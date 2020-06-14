import { Action } from '@ngrx/store';
import { Product } from '../models/product-model';

export enum ProductsActionTypes {
  GetProducts = '[Products] Get Products',
  GetProductsSuccess = '[Products] Get Products Success',
  GetProductsFailed = '[Products] Get Products Failed',
  ChangeFilter = '[Filter] Change Filter',
  ChangeSortType = '[SortType] Change Sort Type',
  AddProductToCart = '[Cart] Add Product To Cart',
}

export class GetProducts implements Action {
  readonly type = ProductsActionTypes.GetProducts;
}

export class GetProductsSuccess implements Action {
  readonly type = ProductsActionTypes.GetProductsSuccess;

  constructor(public payload: Product[]) {}
}

export class GetProductsFailed implements Action {
  readonly type = ProductsActionTypes.GetProductsFailed;

  constructor(public payload: any) {}
}

export class ChangeFilter implements Action {
  readonly type = ProductsActionTypes.ChangeFilter;

  constructor(public payload: string) {}
}

export class ChangeSortType implements Action {
  readonly type = ProductsActionTypes.ChangeSortType;

  constructor(public payload: string) {}
}

export class AddProductToCart implements Action {
  readonly type = ProductsActionTypes.AddProductToCart;

  constructor(public payload: { product: Product, isAdd: boolean }) {}
}

export type ProductsActions =
  | GetProducts
  | GetProductsSuccess
  | GetProductsFailed
  | ChangeFilter
  | ChangeSortType
  | AddProductToCart;
