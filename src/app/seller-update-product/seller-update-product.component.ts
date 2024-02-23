import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private product: ProductService,
    private routrs: Router
  ) {}

  productData: undefined | product;
  updateMsg: string | undefined;
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });
  }

  updateProductById(data: product) {
    console.warn(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateMsg = 'product Updated Succesfully...!';
      }
    });
    setTimeout(() => {
      this.updateMsg = undefined;
    }, 5000);
    this.routrs.navigate(['seller-home']);
  }
}
