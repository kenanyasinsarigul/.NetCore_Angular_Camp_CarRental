import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { CarComponent } from './components/car/car.component';
import { CustomLayoutComponent } from './components/custom-layout/custom-layout.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DetailCarComponent } from './components/detail-car/detail-car.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { SimpleLayoutComponent } from './components/simple-layout/simple-layout.component';
import { UpdateBrandComponent } from './components/update-brand/update-brand.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { UpdateColorComponent } from './components/update-color/update-color.component';
import { UserCompanyComponent } from './components/user-company/user-company.component';
import { UserCreditCardsComponent } from './components/user-credit-cards/user-credit-cards.component';
import { UserFindexScoreComponent } from './components/user-findex-score/user-findex-score.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserComponent } from './components/user/user.component';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { LoginGuard } from './guards/login.guard';
import { AddComponent } from './pages/add/add.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { RentalsComponent } from './pages/rentals/rentals.component';

const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', component: CarComponent },
          { path: 'cars', component: CarComponent },
          { path: 'cars/brand/:brandId', component: CarComponent },
          { path: 'cars/color/:colorId', component: CarComponent },
          { path: 'cars/filter/:colorId/:brandId', component: CarComponent },
        ],
      },

      {
        path: 'user',
        component: UserComponent,
        canActivate: [LoginGuard],
        children: [
          { path: 'settings', component: UserSettingsComponent },
          { path: 'password', component: UserPasswordComponent },
          { path: 'cards', component: UserCreditCardsComponent },
          { path: 'company', component: UserCompanyComponent },
          { path: 'findex', component: UserFindexScoreComponent },
        ],
      },

      {
        path: 'add',
        component: AddComponent,
        canActivate: [LoginGuard, AdminGuard],
        children: [
          { path: '', component: AddComponent },
          { path: 'car', component: AddCarComponent },
          { path: 'brand', component: AddBrandComponent },
          { path: 'color', component: AddColorComponent },
        ],
      },

      {
        path: 'update',
        component: AddComponent,
        canActivate: [LoginGuard, AdminGuard],
        children: [
          { path: '', component: AddComponent },
          { path: 'car/:carId', component: UpdateCarComponent },
          { path: 'brand/:brandId', component: UpdateBrandComponent },
          { path: 'color/:colorId', component: UpdateColorComponent },
        ],
      },

      { path: 'car-detail/:carId', component: DetailCarComponent },

      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [LoginGuard],
        children: [{ path: '', component: PaymentComponent }],
      },

      { path: 'rentals', component: RentalsComponent },
      { path: 'customers', component: CustomerComponent },
      { path: '404', component: Error404Component },
    ],
  },

  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        component: MembershipComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
            canActivate: [LoggedGuard],
          },
          {
            path: 'register',
            component: RegisterComponent,
            canActivate: [LoggedGuard],
          },
        ],
      },
    ],
  },

  {
    path: '**',
    component: CustomLayoutComponent,
    children: [{ path: '', component: Error404Component }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
