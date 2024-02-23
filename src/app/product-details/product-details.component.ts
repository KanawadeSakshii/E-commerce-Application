import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ProductService } from '../service/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  productData: undefined | product;
  productQuantity: number = 1;
  cartData: product | undefined;
  removeFromCart = false;

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (items: product) => productId === items.id.toString()
          );
          if (items.length) {
            this.removeFromCart = true;
          } else {
            this.removeFromCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartListOfUser(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (items: product) =>
                productId?.toString() === items.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeFromCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeFromCart = true;
      } else {
        // console.warn('userl login in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        // console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartListOfUser(userId);
            this.removeFromCart = true;
            alert('product added');
          }
        });
      }
    }
  }
  removetoCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          if (result) {
            this.product.getCartListOfUser(userId)
          }
        });
        alert('Do you want to remove this item from cart?')
        this.removeFromCart = false;

    }
  }
}
