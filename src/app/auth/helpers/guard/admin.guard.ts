// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { SessionService } from '../../service/session.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard implements CanActivate {
  
//   constructor(private router: Router, private session: SessionService) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const token = this.session.getToken();
//     var loggedInUser = this.session.getLoggedInUser();

//     if (
//       (token)) {
//       return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['']);
//     return false;
//   }
  
// }
