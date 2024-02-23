import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { cart, priceSummery } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummery: priceSummery = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }
  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      // console.warn(result);
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummery.price = price;
      this.priceSummery.discount = price / 10;
      this.priceSummery.tax = price / 10;
      this.priceSummery.delivery = 60;
      this.priceSummery.total = price + price / 10 + 60 - price / 10;
      console.log(this.priceSummery);
      if (!this.cartData.length) {
        this.route.navigate(['/']);

      }
    });
  }
  checkOut() {
    this.route.navigate(['/checkout']);
  }

  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
      });
  }
}
