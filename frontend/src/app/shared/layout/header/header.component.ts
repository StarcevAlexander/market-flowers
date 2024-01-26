import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CategoryWithTypeType } from 'src/types/category-with-type.type';
import { CartService } from '../../services/cart.service';
import { DefaultResponseType } from 'src/types/default-response.type';
import { ProductService } from '../../services/product.service';
import { ProductType } from 'src/types/product.type';
import { environment } from 'src/environments/environment.production';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchField = new FormControl();
  showedSearch: boolean = false;
  products: ProductType[] = [];
  // searchValue: string = '';
  count: number = 0;
  isLogged: boolean = false;
  serverStaticPath = environment.serverStaticPath;

  @Input() categories: CategoryWithTypeType[] = [];

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
  ) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value && value.length > 2) {
        this.productService.searchProducts(value).subscribe((data: any) => {
          this.products = data;
          this.showedSearch = true;
        });
      } else {
        this.products = [];
      }
    });

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });
    this.cartService
      .getCartCount()
      .subscribe((data: { count: number } | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.count = (data as { count: number }).count;
      });

    this.cartService.count$.subscribe((count) => {
      this.count = count;
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.doLogout();
      },
      error: () => {
        this.doLogout();
      },
    });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  // changeSearchValue(newValue: string) {
  //   this.searchValue = newValue;
  //   if (this.searchValue && this.searchValue.length > 2) {
  //     this.productService
  //       .searchProducts(this.searchValue)
  //       .subscribe((data: any) => {
  //         this.products = data;
  //       });
  //   } else {
  //     this.products = [];
  //   }
  // }

  selectProduct(url: string) {
    this.router.navigate(['product/' + url]);
    // this.searchValue = '';
    this.searchField.setValue('');
    this.products = [];
  }

  changeShowedSearch(value: boolean) {
    setTimeout(() => {
      this.showedSearch = value;
    }, 100);
  }
}
