import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product-model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'Рубашка на пуговицах',
      images: ['shirt_1', 'shirt_2', 'shirt_3', 'shirt_4', 'shirt_5'],
      type: 'shirt',
      category: 'Рубашки',
      count: 10,
      price: 320
    },
    {
      id: 2,
      name: 'Рубашка с принтом',
      images: ['shirt2', 'shirt_2', 'shirt_3', 'shirt_4', 'shirt_5'],
      type: 'shirt',
      category: 'Рубашки',
      count: 20,
      price: 170
    },
    {
      id: 3,
      name: 'Кроссовки «Kaiwa» Y3 x Adidas',
      images: ['sneakers', 'shirt_2', 'shirt_3', 'shirt_4', 'shirt_5'],
      type: 'sneakers',
      category: 'Обувь',
      count: 30,
      price: 240
    },
    {
      id: 4,
      name: 'Куртка-рубашка с карманами',
      images: ['cloak', 'shirt_2', 'shirt_3', 'shirt_4', 'shirt_5'],
      type: 'cloak',
      category: 'Плащи',
      count: 40,
      price: 1240
    },
    {
      id: 5,
      name: 'Кроссовки с пряжками',
      images: ['sneakers2', 'shirt_2', 'shirt_3', 'shirt_4', 'shirt_5'],
      type: 'sneakers',
      category: 'Обувь',
      count: 50,
      price: 390
    },
    {
      id: 6,
      name: 'Укороченные зауженные брюки',
      images: ['pants', 'shirt_2', 'shirt_3', 'shirt_4', 'shirt_5'],
      type: 'pants',
      category: 'Штаны',
      count: 60,
      price: 647
    },
  ];

  constructor() {}

  public getProducts$(): Observable<Product[]> {
    return of(this.products);
  }

  public getProduct$(id: number): Observable<Product> {
    return of(this.products.find((item) => item.id === id));
  }
}
