import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductType } from 'src/types/product.type';
import { CartType } from '../../../../types/cart.type';
import { environment } from 'src/environments/environment.production';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getBestProducts().subscribe((data: ProductType[]) => {
      this.extraProducts = data;
    });

    this.cartService.getCart().subscribe((data: CartType) => {
      this.cart = data;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    if (this.cart) {
      this.totalAmount = 0;
      this.totalCount = 0;
      this.cart.items.forEach((item) => {
        this.totalAmount += item.quantity * item.product.price;
        this.totalCount += item.quantity;
      });
    }
  }

  updateCount(id: string, count: number) {
    if (this.cart) {
      this.cartService.updateCart(id, count).subscribe((data: CartType) => {
        this.cart = data;
        this.calculateTotal();
      });
    }
  }

  extraProducts: ProductType[] = [];
  cart: CartType | null = null;
  serverStaticPath = environment.serverStaticPath;
  totalAmount: number = 0;
  totalCount: number = 0;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 24,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
}
