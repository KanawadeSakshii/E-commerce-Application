import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string ="";
  searchResult: undefined | product[];
  userName: string ="";
  cartItems = 0;
  constructor(private router: Router, private produ: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn('in seller');
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.produ.getCartListOfUser(userData.id)

        } else {
          this.menuType = 'default';
          // console.warn('outside seller');
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.produ.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
    alert('Do you want to Logout?')
  }
  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.produ.cartData.emit([]);
    alert('Do you want to Logout?')

  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.produ.autoSuggestionSearch(element.value).subscribe((result) => {
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }
}
