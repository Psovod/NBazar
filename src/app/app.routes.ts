import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { UserComponent } from './user/user.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { RealityComponent } from './reality/reality.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { WatchListComponent } from './watch-list/watch-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'uzivatel/reality',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'uzivatel/:id',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sledovane',
    component: WatchListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'reality/:id',
    component: RealityComponent,
  },
  {
    path: 'hledej/:query',
    component: SearchComponent,
  },
  {
    path: 'hledej/:query/:filters',
    component: SearchResultComponent,
  },
  { path: '**', redirectTo: '/login' },
];
