import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { ProductService } from './services/productservice';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthComponent } from './auth/auth.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FavoritesComponent } from './home/favorites/favorites.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { EncryptService } from './services/encrypt.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    SignUpComponent,
    ChangePasswordComponent,
    FavoritesComponent,
    ForgotComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    ButtonModule,
    AppRoutingModule,
    SidebarModule,
    MenubarModule,
    DropdownModule,
    BadgeModule,
    TabViewModule,
    CardModule,
    ToggleButtonModule,
    SelectButtonModule,
    AvatarModule,
    AvatarGroupModule,
    RouterModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  providers: [ProductService, EncryptService],
  bootstrap: [AppComponent],
})
export class AppModule {}
