import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  constructor(private product: ProductService) {}

  productList: undefined | product[];
  deleteproductMsg: undefined | string;
   icons=faTrash;
   editIcon=faEdit
  ngOnInit(): void {
    this.refreshList()
  }

  DeleteProduct(id: number) {
    this.product.deleteProductById(id).subscribe((result) => {
      if (result) {
        this.deleteproductMsg = 'Product Delete Succefully...!';
      this.refreshList()
      }
    });
    setTimeout(() => {
      this.deleteproductMsg = undefined;
    }, 3000);
  }
  refreshList(){
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }
}
