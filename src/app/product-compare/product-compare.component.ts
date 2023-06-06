import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.css']
})
export class ProductCompareComponent implements OnInit{
  constructor(private route: ActivatedRoute, private authService: AuthService,
    private router: Router){}

  productList: any = [];

  img1: string = "../../assets/pics/fan1.png";
  img2: string = "../../assets/pics/fan2.png";
  img3: string = "../../assets/pics/fan3.png";
  img4: string = "../../assets/pics/fan4.png";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productListString = params.get('compareInfo');
      if (productListString) {
        this.productList = JSON.parse(productListString);
      }
    });
    console.log(this.productList);
  }

  logOut(){
    this.authService.logout();
    alert('Log out success!');
    this.router.navigate(['login']);
  }

}
