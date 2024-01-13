import { CartType } from './../../../types/cart.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<CartType> {
    return this.http.get<CartType>(environment.api + 'cart');
  }

}
