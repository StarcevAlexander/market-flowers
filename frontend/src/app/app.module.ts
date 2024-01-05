import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { MainComponent } from './views/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    CarouselModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
