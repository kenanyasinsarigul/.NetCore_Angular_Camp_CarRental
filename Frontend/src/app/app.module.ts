import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandComponent } from './components/brand/brand.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { UpdateBrandComponent } from './components/update-brand/update-brand.component';
import { CarComponent } from './components/car/car.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { DetailCarComponent } from './components/detail-car/detail-car.component';
import { FilterCarComponent } from './components/filter-car/filter-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { ColorComponent } from './components/color/color.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { UpdateColorComponent } from './components/update-color/update-color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { UserCompanyComponent } from './components/user-company/user-company.component';
import { UserCreditCardsComponent } from './components/user-credit-cards/user-credit-cards.component';
import { UserFindexScoreComponent } from './components/user-findex-score/user-findex-score.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserRoutingsComponent } from './components/user-routings/user-routings.component';
import { AddComponent } from './pages/add/add.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { CustomLayoutComponent } from './components/custom-layout/custom-layout.component';
import { SimpleLayoutComponent } from './components/simple-layout/simple-layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    FilterBrandPipe,
    FilterColorPipe,
    HeaderComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    BrandComponent,
    AddBrandComponent,
    UpdateBrandComponent,
    CarComponent,
    AddCarComponent,
    DetailCarComponent,
    FilterCarComponent,
    UpdateCarComponent,
    ColorComponent,
    AddColorComponent,
    UpdateColorComponent,
    CustomerComponent,
    PaymentComponent,
    RentCarComponent,
    RentalComponent,
    UserComponent,
    UserCompanyComponent,
    UserCreditCardsComponent,
    UserFindexScoreComponent,
    UserPasswordComponent,
    UserSettingsComponent,
    UserRoutingsComponent,
    AddComponent,
    CarDetailComponent,
    CustomersComponent,
    Error404Component,
    HomeComponent,
    MembershipComponent,
    RentalsComponent,
    CustomLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
      }
    }),
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
 }
