import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageViewComponent } from './views/homepage-view/homepage-view.component';
import { UserDataViewComponent } from './views/user-data-view/user-data-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { ViewDataComponent } from './home/user-data/view-data/view-data.component';
import { UpdateComponent } from './home/user-data/update/update.component';
import { UpdatePasswordComponent } from './home/user-data/update-password/update-password.component';
import { ForgetPasswordComponent } from './home/user-data/forget-password/forget-password.component';
import { ResetPasswordComponent } from './home/user-data/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home", pathMatch: "full"
  },
  {
    path: "home",
    component: HomepageViewComponent
  },
  {
    path: "user-data",
    component: UserDataViewComponent,
    children: [
      { path: "view", component: ViewDataComponent},
      { path: "update", component: UpdateComponent},
      { path: "update-password", component: UpdatePasswordComponent}
    ]
  },
  {
    path: "reset-password",
    component: UserDataViewComponent,
    children: [
      { path: "", component: UpdatePasswordComponent}
    ]
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent
  },
  {
    path: "validate-code",
    component: ResetPasswordComponent
  },
  {
    path: "login",
    component: LoginViewComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
