import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { ArrowType } from '../../shared/constants/constants';
import { Product } from '../../models/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  public forward = ArrowType.FORWARD;
  public back = ArrowType.BACK;
  public isSliderVisible = false;
  public imagePath: string;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.imagePath = this.product.images[0];
  }

  public slideImages(direction: string): void {
    const index = this.getCurrentActiveImage();
    if (direction === ArrowType.FORWARD && index < this.product.images.length - 1) {
      this.imagePath = this.product.images[index + 1];
    } else if (direction === ArrowType.BACK && index > 0) {
      this.imagePath = this.product.images[index - 1];
    }
  }

  public getCurrentActiveImage(): number {
    return this.product.images.indexOf(this.imagePath);
  }

  public changeImage(item: string): void {
    this.imagePath = item;
  }

  public isImageActive(item: string): boolean {
    return this.imagePath === item;
  }

  public isDisabledControl(controlType: string): boolean {
    const index = this.getCurrentActiveImage();

    return (controlType === ArrowType.FORWARD && index >= this.product.images.length - 1)
    || (controlType === ArrowType.BACK && index === 0);
  }

  public openProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  public changeSliderVisability(event: any, isVisible: boolean): void {
    if (!isVisible && event.toElement.className
      && (event.toElement.className === 'product__slider' || event.toElement.offsetParent.className === 'product__slider')) {
      return;
    }
    this.isSliderVisible = isVisible;
  }
}
