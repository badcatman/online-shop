import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getCartProducts } from '../../selectors/products.selector';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public isCartVisible = false;
  public productsCount$: Observable<number>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.productsCount$ = this.store.pipe(select(getCartProducts))
      .pipe(map((list) => {
        return list.length ? list.map((product) => product.count)
          .reduce((accumulator, currentValue) => accumulator + currentValue) : 0;
      }));
  }

  public showCart(): void {
    this.isCartVisible = true;
  }

  public hideCart(): void {
    this.isCartVisible = false;
  }
}
