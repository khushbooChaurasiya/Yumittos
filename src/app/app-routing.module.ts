import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdGuard } from './auth-gaurd.guard';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { HomeComponent } from './home/home.component';
import { HomedashboardComponent } from './homedashboard/homedashboard.component';
import { LoginComponent } from './login/login.component';
import { MenudetailsComponent } from './menudetails/menudetails.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [{
  path:"login", component:LoginComponent
 
},
{
  path:"home", component:HomeComponent
},
{
  path:"signup",component:RegistrationComponent
},
{
  path:"productmenu", component:HomedashboardComponent, 
  // canActivate:[AuthGaurdGuard],
  children:[{
    path:":titlename", component:MenudetailsComponent
  },
 ]
},
{
path:"fooddetails/:titlename", component:FoodDetailsComponent
},
{
  path:"**", component:HomeComponent
}
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
