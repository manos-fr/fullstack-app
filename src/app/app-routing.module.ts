import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FavoritesComponent } from './home/favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { NotificationsComponent } from './home/notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/main', pathMatch: 'full' },

  {
    path: 'auth',
    // canActivate: [AuthGuardService, CustomerRedirectService],
    children: [
      {
        path: 'login',
        component: AuthComponent,
        // canActivate: [PasswordService]
      },
      {
        path: 'change',
        component: ChangePasswordComponent,
      },
      {
        path: 'forgot',
        component: ForgotComponent,
      },
      // {
      //   path: 'auth/password/reset/:token',
      //   component: NewPasswordComponent,
      // },

      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      // {
      //   path: 'roles/:action',
      //   component: RolesListComponent,
      //   children: [],
      //   canActivate: [PasswordService]
      // },
      // {
      //   path: 'change-password',
      //   component: ChangePasswordComponent,
      //   children: [],
      // },
    ],
  },

  {
    path: 'home',
    children: [
      { path: 'favorites', component: FavoritesComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'main', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
