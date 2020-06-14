import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector('products');

export const getProducts = createSelector(
  featureSelector,
  ({ products }) => products
);

export const getActiveFilter = createSelector(
  featureSelector,
  ({ activeFilter }) => activeFilter
);

export const getSortType = createSelector(
  featureSelector,
  ({ sortType }) => sortType
);

export const getCartProducts = createSelector(
  featureSelector,
  ({ cart }) => cart
);
