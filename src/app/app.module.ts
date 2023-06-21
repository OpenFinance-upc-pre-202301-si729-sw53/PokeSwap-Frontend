import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { TokenComponent } from './components/token/token.component';
import { ExchangeComponent, ExchangeDialog } from './components/exchange/exchange.component';
import { TokensListComponent } from './components/tokens-list/tokens-list.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OperationsComponent } from './components/operations/operations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
    UsersComponent,
    CurrenciesComponent,
    TokenComponent,
    ExchangeComponent,
    ExchangeDialog,
    TokensListComponent,
    RegisterComponent,
    DashboardComponent,
    OperationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
