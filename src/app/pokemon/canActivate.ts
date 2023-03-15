import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn } from "@angular/router";
import { map, catchError, of } from "rxjs";
import { AuthGuard } from "../auth.guard";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthGuard);
    const router = inject(Router);
  
    // return authService.checkLogin().pipe(
    //   map(() => true),
    //   catchError(() => {
    //     router.navigate(['route-to-fallback-page']);
    //     return of(false);
    //   })
    return true;
  };
  
  export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);