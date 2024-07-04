import {CanActivateFn, Router} from '@angular/router';
import {authenticate} from "../fn/authentication/authenticate";
import {TokenService} from "../token/token.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);

  const token=localStorage.getItem('token');
  if(token != null){
    return true;
  }else{
    router.navigateByUrl('login');
    return false;
  }


  return true;

};
