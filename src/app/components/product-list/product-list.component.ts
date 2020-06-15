import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetProducts } from '../../actions/products.action';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product-model';
import { getProducts, getActiveFilter, getSortType } from '../../selectors/products.selector';
import { FilterType, SortType } from '../../shared/constants/constants';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  public productsList$: Observable<Product[]>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
    this.productsList$ = combineLatest([
      this.store.pipe(select(getProducts)),
      this.store.pipe(select(getActiveFilter)),
      this.store.pipe(select(getSortType))
    ]).pipe(
      map(([list, activeFilter, sortType]) => list
        .filter(({type}) => activeFilter !== FilterType.ALL ? type === activeFilter : true)
        .sort((prev, next) => {
          switch (sortType) {
            case SortType.LOW_COST:
              return prev.price - next.price;
              break;
            case SortType.HIGH_COST:
              return next.price - prev.price;
              break;
            case SortType.NEW:
              return next.count - prev.count;
              break;
            case SortType.POPULAR:
              return prev.count - next.count;
              break;
            default:
              return prev.count - next.count;
          }
        })
      )
    );
        // let productsList = (activeFilter !== FilterType.ALL ? list.filter(({type}) => type === activeFilter) : list);
        // productsList = productsList.slice().sort((prev, next) => {
        //   switch (sortType) {
        //     case SortType.LOW_COST:
        //       return prev.price - next.price;
        //       break;
        //     case SortType.HIGH_COST:
        //       return next.price - prev.price;
        //       break;
        //     case SortType.NEW:
        //       return next.count - prev.count;
        //       break;
        //     case SortType.POPULAR:
        //       return prev.count - next.count;
        //       break;
        //     default:
        //       return prev.count - next.count;
        //   }
        // });
  }

}
