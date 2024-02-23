import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-products',
  templateUrl: './seller-add-products.component.html',
  styleUrls: ['./seller-add-products.component.css'],
})
export class SellerAddProductsComponent implements OnInit {
  constructor(private product: ProductService) {}
  addproductMsg: string | undefined = '';
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  addnewProduct(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addproductMsg = 'product Added Succesfully...!';
      }
      setTimeout(() => (this.addproductMsg = undefined), 5000);
    });
  }
}
