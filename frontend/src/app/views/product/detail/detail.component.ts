import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductType } from 'src/types/product.type';
import { environment } from '../../../../environments/environment.production';
import { CartType } from 'src/types/cart.type';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  recomendedProducts: ProductType[] = [];
  product!: ProductType;
  serverStaticPath = environment.serverStaticPath;
  count: number = 1;
  countInCart: number | undefined = 0;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productService
        .getProduct(params['url'])
        .subscribe((data: ProductType) => {
          this.cartService.getCart().subscribe((cartData: CartType) => {
            if (cartData) {
              const productInCart = cartData.items.find(
                (item) => item.product.id == data.id
              );
              if (productInCart) {
                data.countInCart = productInCart.quantity;
                this.count = data.countInCart;
              }
            }
            this.product = data;
          });
        });
    });

    this.productService.getBestProducts().subscribe((data: ProductType[]) => {
      this.recomendedProducts = data;
    });
  }

  updateCount(value: number) {
    this.count = value;
    if (this.product.countInCart) {
      this.cartService
        .updateCart(this.product.id, this.count)
        .subscribe((data: CartType) => {
          this.product.countInCart = this.count;
        });
    }
  }

  addToCart() {
    this.cartService
      .updateCart(this.product.id, this.count)
      .subscribe((data: CartType) => {
        this.product.countInCart = this.count;
      });
  }

  removeFromCart() {
    this.cartService.updateCart(this.product.id, 0).subscribe();
    this.product.countInCart = 0;
    this.count = 1;
  }

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
