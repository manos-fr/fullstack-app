import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth/login',
    component: AuthComponent,
    // canActivate: [AuthGuardService, CustomerRedirectService],
    children: [
      {
        path: 'auth/login',
        component: AuthComponent,
        children: [],
        // canActivate: [PasswordService]
      },
      // {
      //   path: 'auth/forgot',
      //   component: ForgotPasswordComponent,
      // },
      // {
      //   path: 'auth/password/reset/:token',
      //   component: NewPasswordComponent,
      // },
      {
        path: '*path',
        redirectTo: 'auth/login',
      },
      // {
      //   path: 'users',
      //   component: UserListComponent,
      //   children: [],
      //   canActivate: [PasswordService]
      // },
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

  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
