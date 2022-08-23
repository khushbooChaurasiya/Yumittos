import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {
  constructor(private service:LoginService ,private router:Router){}
  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  // {
  //   if(!this.service.isAdminUser()){
  //     alert("You are not admin and not allowed to edit the product");
  //     return false;
  //   }  
  //   return true;
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

  if(!this.service.isUserLoggedIn()){
    alert("You are not logged in to view the page");
    this.router.navigate(["login"],{queryParams:{retUrl:route.url}});
    return false;
  }
    return true;
  }
 
  
}
