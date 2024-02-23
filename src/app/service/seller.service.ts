import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient, private router: Router) {}

  isSellerSignIn = new BehaviorSubject<boolean>(false);
  isLoginFail = new EventEmitter<boolean>(false)

  //signUp from data-type.ts fot data type of field
  SellerSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        // this.isSellerSignIn.next(true);
        console.warn(result); 
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']); //redirect
        }
      });
  }
  reloadedSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerSignIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: login) {
    //userLogin this data pass to component file seller.auth.component
    //api call
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {
          console.warn('success');
          localStorage.setItem('seller',JSON.stringify(result.body));
          this.router.navigate(['seller-home'])
        } else {
          console.warn('fail');
          this.isLoginFail.emit(true);
        }
      });
  }
}
