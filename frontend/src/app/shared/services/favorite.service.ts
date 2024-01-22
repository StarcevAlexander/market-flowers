import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../../environments/environment.production';
import { Observable } from 'rxjs';
import { FavoriteType } from 'src/types/favorite.type';
import { DefaultResponseType } from '../../../types/default-response.type';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private http: HttpClient) {}

  getFavorites(): Observable<FavoriteType[] | DefaultResponseType> {
    return this.http.get<FavoriteType[] | DefaultResponseType>(
      environment.api + 'favorites'
    );
  }

  removeFavorite(productId: string): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(
      environment.api + 'favorites',
      { body: { productId } }
    );
  }
  addFavorite(
    productId: string
  ): Observable<FavoriteType[] | DefaultResponseType> {
    return this.http.post<FavoriteType[] | DefaultResponseType>(
      environment.api + 'favorites',
      {
        productId,
      }
    );
  }
}
