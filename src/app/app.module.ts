import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './template/header-one/header-one.component';
import { NavComponent } from './template/nav/nav.component';
import { FooterComponent } from './template/footer/footer.component';
import { RegisterComponent } from './home/homepage/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogAnimationComponent } from './template/dialog-animation/dialog-animation.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ViewDataComponent } from './home/user-data/view-data/view-data.component';
import { HomepageViewComponent } from './views/homepage-view/homepage-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { UserDataViewComponent } from './views/user-data-view/user-data-view.component';
import { LoginComponent } from './home/login/login.component';
import { DialogChangesComponent } from './template/dialog-changes/dialog-changes.component';
import { DialogConfirmComponent } from './template/dialog-confirm/dialog-confirm.component';
import { UserDataComponent } from './home/user-data/user-data/user-data.component';
import { UpdateComponent } from './home/user-data/update/update.component';
import { UpdatePasswordComponent } from './home/user-data/update-password/update-password.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    DialogAnimationComponent,
    ViewDataComponent,
    HomepageViewComponent,
    LoginViewComponent,
    UserDataViewComponent,
    LoginComponent,
    DialogChangesComponent,
    DialogConfirmComponent,
    UserDataComponent,
    UpdateComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
