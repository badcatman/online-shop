import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getCartProducts } from '../../selectors/products.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../../models/product-model';
import { AddProductToCart } from '../../actions/products.action';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  @Output() onHided = new EventEmitter();
  public productsList$: Observable<Product[]>;
  public totalPrice = 0;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.productsList$ = this.store.pipe(select(getCartProducts))
      .pipe(tap((list) => {
        this.totalPrice = list.length ? list.map((product) => product.price * product.count)
          .reduce((accumulator, currentValue) => accumulator + currentValue) : 0;
      }));
  }

  public hideCart(): void {
    this.onHided.emit();
  }

  public changeProductCount(product: Product, isAdd: boolean): void {
    this.store.dispatch(new AddProductToCart({ product, isAdd }));
  }

}
