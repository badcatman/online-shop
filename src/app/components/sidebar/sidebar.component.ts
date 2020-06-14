import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ArrowType, FilterType, SortType } from '../../shared/constants/constants';
import { select, Store } from '@ngrx/store';
import { ChangeFilter, ChangeSortType } from '../../actions/products.action';
import { getActiveFilter } from '../../selectors/products.selector';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isSortListVisible = false;
  public arrowType: string;
  public filterType = FilterType;
  public sortType = SortType;
  public activeFilter: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.arrowType = ArrowType.DOWN;
    this.store.pipe(select(getActiveFilter))
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((filterName: string) => this.activeFilter = filterName);
  }

  public toggleSortListVisability(): void {
    this.isSortListVisible = !this.isSortListVisible;
    this.arrowType = this.isSortListVisible ? ArrowType.UP : ArrowType.DOWN;
  }

  public changeFilter(filterName: FilterType): void {
    this.store.dispatch(new ChangeFilter(filterName));
  }

  public changeSortType(sortType: SortType): void {
    this.store.dispatch(new ChangeSortType(sortType));
    this.toggleSortListVisability();
  }

  public isFilterActive(filterName: FilterType): boolean {
    return this.activeFilter === filterName;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
