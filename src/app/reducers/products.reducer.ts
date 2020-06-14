import { ProductsActions, ProductsActionTypes } from '../actions/products.action';
import { Product } from '../models/product-model';

export interface ProductsState {
  products: Product[];
  activeFilter: string;
  sortType: string;
  cart: Product[];
}

export const initialState: ProductsState = {
  products: [],
  activeFilter: 'all',
  sortType: 'popular',
  cart: []
};

export function productsReducer(state = initialState, action: ProductsActions): ProductsState {
  const { payload, type } = action as any;
  switch (type) {
    case ProductsActionTypes.GetProductsSuccess: {
      return { ...state, products: payload };
    }

    case ProductsActionTypes.ChangeFilter: {
      return { ...state, activeFilter: payload };
    }

    case ProductsActionTypes.ChangeSortType: {
      return { ...state, sortType: payload };
    }

    case ProductsActionTypes.AddProductToCart: {
      const shoppingCart = JSON.parse(JSON.stringify(state.cart));
      const existedProduct = shoppingCart.find((item) => item.id === payload.product.id);

      if (existedProduct) {
        payload.isAdd ?  existedProduct.count++ : existedProduct.count--;
      } else {
        shoppingCart.push({ ...payload.product, count: 1 });
      }

      if (existedProduct && existedProduct.count === 0) {
        shoppingCart.splice(shoppingCart.indexOf(existedProduct), 1);
      }

      return { ...state, cart: [...shoppingCart] };
    }

    default: {
      return state;
    }
  }
}

export const productsReducers = {
  products: productsReducer
};
