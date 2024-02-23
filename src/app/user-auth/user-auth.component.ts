import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  constructor(private user: UserService, private product: ProductService) {}
  showlogin: boolean = true;
  authError: string = '';
  ngOnInit(): void {
    this.user.userReload();
  }
  signUp(data: signUp) {
    this.user.userSignUp(data);
    // console.warn(data);
  }
  login(data: login) {
    // console.warn(data);
    this.user.userLogin(data);
    this.user.invaliduserAuth.subscribe((result) => {
      if (result) {
        this.authError ='Please Enter Correct Email And Password';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openlogin() {
    this.showlogin = false;
  }
  openSignUp() {
    this.showlogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartdataList: product[] = JSON.parse(data);

      cartdataList.forEach((product:product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {

            }
          });
        },500);
        if(cartdataList.length===index+1){
          localStorage.removeItem('localCart')
                    }
      });
    }
    setTimeout(() => {
      this.product.getCartListOfUser(userId)
    }, 2000);
  }
}
