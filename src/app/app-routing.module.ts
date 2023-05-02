import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { TokenComponent } from './components/token/token.component';
import { TokensListComponent } from './components/tokens-list/tokens-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'currencies', component: CurrenciesComponent, pathMatch: 'full' },
  { path: 'token', component: TokenComponent, pathMatch: 'full' },
  { path: 'exchange', component: ExchangeComponent, pathMatch: 'full' },
  { path: 'portfolio', component: TokensListComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
