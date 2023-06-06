import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchInfo!: string;
  searchForm!: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private authService: AuthService, private router: Router,
    private formBuilder: FormBuilder, private searchService: SearchService){
  }
  ngOnInit() {
    this.searchService.getAllBrands().subscribe(
      {
        next: response => {
          for (const iterator of response) {
            this.options.push(iterator);
          }
        },
        error: error => console.error(error)
      }
    );

    this.searchForm = this.formBuilder.group({
      searchText: ['']
    });
    this.filteredOptions = this.searchForm.get('searchText')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // return this.options;
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(value: string): string {
    return value ? value : '';
  }

  search(){
    const searchText = this.searchForm.get('searchText')?.value;
    this.searchService.getProductInfoByBrand(searchText).subscribe(
      {
        next: response => {
          console.log(response);
          this.router.navigate(['/product', JSON.stringify(response)]);
        },
        error: error => {
          console.error(error);
        }
      }
    );
  }

  logOut(){
    this.authService.logout();
    alert('Log out success!');
    this.router.navigate(['login']);
  }
}
