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

const routes: Routes = [
  {
    path: 'page1',
    component: MoneyTransferComponent,
    children: [
      // { path: 'component1', component: Page1Component1 },
      { path: 'component2', component: MoneyHeaderComponent },
      { path: 'component3', component: TransferComponent },
      { path: 'component4', component: MobileAppComponent },
      // { path: 'component5', component: Page1Component5 }
    ],
  },
  {
    path: 'page2',
    component: MyAccountComponent,
    children: [
      // { path: 'component1', component: Page2Component1 },
      { path: 'component2', component: MoneyHeaderComponent },
      { path: 'component3', component: AccountComponent },
      { path: 'component4', component: MobileAppComponent },
      // { path: 'component5', component: Page2Component5 }
    ],
  },
  { path: '', redirectTo: '/page1', pathMatch: 'full' },
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
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
