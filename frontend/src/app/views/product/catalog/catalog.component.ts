import { ProductType } from 'src/types/product.type';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryWithTypeType } from '../../../../types/category-with-type.type';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products: ProductType[] = [];
  categoriesWithTypes: CategoryWithTypeType[] = [];
  constructor(
    private productService: ProductService,
    private categotyService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.items;
    });

    this.categotyService.getCategoriesWithTypes().subscribe((data) => {
      this.categoriesWithTypes = data;
    });
  }
}
