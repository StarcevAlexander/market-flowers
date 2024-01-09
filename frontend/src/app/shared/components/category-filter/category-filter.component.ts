import { CategoryWithTypeType } from './../../../../types/category-with-type.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  @Input() categoryWithTypes: CategoryWithTypeType | null = null;
  @Input() type: string | null = null;

  open = false;

  get title(): string {
    if (this.categoryWithTypes) {
      return this.categoryWithTypes.name;
    } else if (this.type) {
      if (this.type === 'height') {
        return 'Высота';
      } else if (this.type === 'diameter') {
        return 'Диаметр';
      }
    }
    return '';
  }

  toggle(): void {
    this.open = !this.open;
  }
}
