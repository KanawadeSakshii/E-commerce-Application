import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin = true;
  errorMsg: string = '';

  ngOnInit(): void {
    this.seller.reloadedSeller();
  }

  signUp(data: signUp) {
    this.seller.SellerSignUp(data); //API call
  }
  Login(data: signUp) {
    this.errorMsg=" "
    // console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginFail.subscribe((isError) => {
      if (isError) {
        this.errorMsg='Email or Password is Incorrect...!'
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
