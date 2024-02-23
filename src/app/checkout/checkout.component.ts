import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private product: ProductService, private router: Router) {}

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      // console.warn(result);

      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 60 - price / 10;
      console.log(this.totalPrice);
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 1000);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          alert('order Placed');
          this.orderMsg = 'your Order Has Been Place';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;

          }, 900);
        }
      });
    }
  }
}
