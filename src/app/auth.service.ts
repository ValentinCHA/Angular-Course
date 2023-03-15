import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor() { }

  login(name: string, password: string): Observable<boolean> {
    let isLoggedIn = (name === 'admin' && password === 'admin');
    
    return of(isLoggedIn).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = val)
    )
  }

  logout() {
    this.isLoggedIn = false;
  }

}
