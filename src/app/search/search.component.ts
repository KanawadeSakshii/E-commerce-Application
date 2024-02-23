import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private activateRout: ActivatedRoute,
    private product: ProductService
  ) {}
  searchResult: undefined | product[];
  ngOnInit(): void {
    // path:'search/:query' in routing SearchComponent so we take get('query') here too
    let query = this.activateRout.snapshot.paramMap.get('query');
    query &&
      this.product.autoSuggestionSearch(query).subscribe((Result) => {
        this.searchResult = Result;
      });
  }
}
