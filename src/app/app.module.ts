import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoneyHeaderComponent } from './money-header/money-header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MobileAppComponent } from './mobile-app/mobile-app.component';
import { TransferComponent } from './transfer/transfer.component';
import { AccountComponent } from './account/account.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { HomeComponent } from './home/home.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { NoProfileComponent } from './no-profile/no-profile.component';
import { NavLoginComponent } from './nav-login/nav-login.component';

const routes: Routes = [
  { path: 'transfermoney', component: MoneyTransferComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homelogin', component: HomeLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'createpassword', component: CreatePasswordComponent },
  { path: 'profile', component: NoProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MoneyHeaderComponent,
    MobileAppComponent,
    TransferComponent,
    AccountComponent,
    MoneyTransferComponent,
    MyAccountComponent,
    NavbarComponent,
    FooterComponent,
    SignUpComponent,
    LoginComponent,
    HomePageComponent,
    CreatePasswordComponent,
    HomeComponent,
    HomeLoginComponent,
    NoProfileComponent,
    NavLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
