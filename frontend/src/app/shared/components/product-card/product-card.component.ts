import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from 'src/types/product.type';
import { environment } from '../../../../environments/environment.production';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductType;
  @Input() isLight: boolean = false;
  serverStaticPath = environment.serverStaticPath;
  count: number = 1;
  constructor() {}
  ngOnInit(): void {}
}
