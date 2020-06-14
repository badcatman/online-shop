import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { getProducts } from '../../selectors/products.selector';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Product } from '../../models/product-model';
import { AddProductToCart } from '../../actions/products.action';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public product: Product;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<any>,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.activateRoute.params
    .pipe(
      takeUntil(this.destroy$),
      switchMap(({id}) => this.productsService.getProduct(+id))
    )
      .subscribe((data: Product) => this.product = data);
  }

  public addToCart(): void {
    this.store.dispatch(new AddProductToCart({ product: this.product, isAdd: true} ));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
