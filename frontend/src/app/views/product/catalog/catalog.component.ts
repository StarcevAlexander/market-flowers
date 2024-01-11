import { AppliedFilterType } from './../../../../types/applied-filter.type';
import { ProductType } from 'src/types/product.type';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryWithTypeType } from '../../../../types/category-with-type.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveParamsUtil } from 'src/app/shared/utils/active-params.util';
import { ActiveParamsType } from 'src/types/active-params.type';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products: ProductType[] = [];
  categoriesWithTypes: CategoryWithTypeType[] = [];
  activeParams: ActiveParamsType = { types: [] };
  appliedFilters: AppliedFilterType[] = [];
  sortingOpen = false;

  sortingOptions: { name: string; value: string }[] = [
    { name: 'От А до Я', value: 'az-asc' },
    { name: 'От Я до А', value: 'az-desc' },
    { name: 'По возрастанию цены', value: 'price-asc' },
    { name: 'По убыванию цены', value: 'price-desc' },
  ];

  constructor(
    private productService: ProductService,
    private categotyService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categotyService.getCategoriesWithTypes().subscribe((data) => {
      this.categoriesWithTypes = data;

      this.activatedRoute.queryParams.subscribe((params) => {
        this.activeParams = ActiveParamsUtil.processParams(params);
        this.appliedFilters = [];

        this.activeParams.types.forEach((url) => {
          for (let i = 0; i < this.categoriesWithTypes.length; i++) {
            const foundType = this.categoriesWithTypes[i].types.find(
              (type) => type.url === url
            );
            if (foundType) {
              this.appliedFilters.push({
                name: foundType.name,
                urlParam: foundType.url,
              });
            }
          }
        });

        if (this.activeParams.heightFrom) {
          this.appliedFilters.push({
            name: 'Высота: от ' + this.activeParams.heightFrom + ' см',
            urlParam: 'heightFrom',
          });
        }
        if (this.activeParams.heightTo) {
          this.appliedFilters.push({
            name: 'Высота: до ' + this.activeParams.heightTo + ' см',
            urlParam: 'heightTo',
          });
        }
        if (this.activeParams.diameterFrom) {
          this.appliedFilters.push({
            name: 'Диаметр: от ' + this.activeParams.diameterFrom + ' см',
            urlParam: 'diameterFrom',
          });
        }
        if (this.activeParams.diameterTo) {
          this.appliedFilters.push({
            name: 'Диаметр: до ' + this.activeParams.diameterTo + ' см',
            urlParam: 'diameterTo',
          });
        }
      });
    });

    this.productService.getProducts().subscribe((data) => {
      this.products = data.items;
    });
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    if (
      appliedFilter.urlParam === 'heightFrom' ||
      appliedFilter.urlParam === 'heightTo' ||
      appliedFilter.urlParam === 'diameterFrom' ||
      appliedFilter.urlParam === 'diameterTo'
    ) {
      delete this.activeParams[appliedFilter.urlParam];
    } else {
      this.activeParams.types = this.activeParams.types.filter(
        (item) => item !== appliedFilter.urlParam
      );
    }
    this.router.navigate(['/catalog'], { queryParams: this.activeParams });
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }

  sort(value: string) {
    this.activeParams.sort = value;
    this.router.navigate(['/catalog'], { queryParams: this.activeParams });
  }
}
