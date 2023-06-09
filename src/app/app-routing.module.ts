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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OperationsComponent } from './components/operations/operations.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'currencies', redirectTo: '/dashboard/currencies'},
  { path: 'dashboard/currencies', component: CurrenciesComponent, pathMatch: 'full' },
  { path: 'token', redirectTo: '/dashboard/token'},
  { path: 'dashboard/token', component: TokenComponent, pathMatch: 'full' },
  { path: 'exchange', redirectTo: '/dashboard'},
  { path: 'platforms', redirectTo: '/dashboard/platforms'},
  { path: 'dashboard/platforms', component: CurrenciesComponent, pathMatch: 'full' },
  { path: 'crypto', redirectTo: '/dashboard/crypto'},
  { path: 'dashboard/crypto', component: TokenComponent, pathMatch: 'full' },
  { path: 'exchange', redirectTo: '/dashboard/exchange'},
  { path: 'dashboard/exchange', component: ExchangeComponent, pathMatch: 'full' },
  { path: 'portfolio', redirectTo: 'dashboard/portfolio'},
  { path: 'dashboard/portfolio', component: TokensListComponent, pathMatch: 'full' },
  { path: 'operations', redirectTo: 'dashboard/operations'},
  { path: 'dashboard/operations', component: OperationsComponent, pathMatch: 'full' },
  { path: 'wallet', redirectTo: 'dashboard/wallet'},
  { path: 'dashboard/wallet', component: WalletComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
