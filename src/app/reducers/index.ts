import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { productsReducer, ProductsState } from './products.reducer';

export interface State {
  products: ProductsState;
}

export const reducers: ActionReducerMap<State> = {
  products: productsReducer
};

export const metaReducers: MetaReducer<State>[] = environment.production ? [] : [];
