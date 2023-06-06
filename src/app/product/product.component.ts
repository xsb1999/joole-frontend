import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { SearchService } from '../services/search.service';
import { advancedSearchInfo } from '../advancedSearchInfo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  arrowRotated1: boolean = false;
  arrowRotated2: boolean = false;
  arrowRotated3: boolean = false;
  arrowRotated4: boolean = false;
  arrowRotated5: boolean = false;

  minValue1: number = 25;
  maxValue1: number = 75;
  minValue2: number = 25;
  maxValue2: number = 75;
  minValue3: number = 25;
  maxValue3: number = 75;
  minValue4: number = 25;
  maxValue4: number = 75;
  minValue5: number = 25;
  maxValue5: number = 75;
  minValue6: number = 25;
  maxValue6: number = 75;
  minValue7: number = 25;
  maxValue7: number = 75;
  tempValue: number = 0;

  img1: string = "../../assets/pics/fan1.png";
  img2: string = "../../assets/pics/fan2.png";
  img3: string = "../../assets/pics/fan3.png";
  img4: string = "../../assets/pics/fan4.png";

  maxAirflow: number = 0;
  minAirflow: number = 0;
  maxPower: number = 0;
  minPower: number = 0;
  maxSound: number = 0;
  minSound: number = 0;
  maxDiameter: number = 0;
  minDiameter: number = 0;
  maxHeight: number = 0;
  minHeight: number = 0;
  

  updateRangeValues(t1: string, t2: string, n: number): void {
    if(n === 1){
      this.minValue1 = +(<HTMLInputElement>document.querySelector('#'+t1)).value;
    this.maxValue1 = +(<HTMLInputElement>document.querySelector('#'+t2)).value;
    if(this.minValue1 > this.maxValue1){
      this.tempValue = this.minValue1;
      this.minValue1 = this.maxValue1;
      this.maxValue1 = this.tempValue;
    }
    }
    if(n === 2){
      this.minValue2 = +(<HTMLInputElement>document.querySelector('#'+t1)).value;
    this.maxValue2 = +(<HTMLInputElement>document.querySelector('#'+t2)).value;
    if(this.minValue2 > this.maxValue2){
      this.tempValue = this.minValue2;
      this.minValue2 = this.maxValue2;
      this.maxValue2 = this.tempValue;
    }
    }
    if(n === 3){
      this.minValue3 = +(<HTMLInputElement>document.querySelector('#'+t1)).value;
    this.maxValue3 = +(<HTMLInputElement>document.querySelector('#'+t2)).value;
    if(this.minValue3 > this.maxValue3){
      this.tempValue = this.minValue3;
      this.minValue3 = this.maxValue3;
      this.maxValue3 = this.tempValue;
    }
    }
    if(n === 4){
      this.minValue4 = +(<HTMLInputElement>document.querySelector('#'+t1)).value;
    this.maxValue4 = +(<HTMLInputElement>document.querySelector('#'+t2)).value;
    if(this.minValue4 > this.maxValue4){
      this.tempValue = this.minValue4;
      this.minValue4 = this.maxValue4;
      this.maxValue4 = this.tempValue;
    }
    }
    if(n === 5){
      this.minValue5 = +(<HTMLInputElement>document.querySelector('#'+t1)).value;
    this.maxValue5 = +(<HTMLInputElement>document.querySelector('#'+t2)).value;
    if(this.minValue5 > this.maxValue5){
      this.tempValue = this.minValue5;
      this.minValue5 = this.maxValue5;
      this.maxValue5 = this.tempValue;
    }
    }
    if(n === 6){
      this.minValue6 = +(<HTMLInputElement>document.querySelector('#'+t1)).value;
    this.maxValue6 = +(<HTMLInputElement>document.querySelector('#'+t2)).value;
    if(this.minValue6 > this.maxValue6){
      this.tempValue = this.minValue6;
      this.minValue6 = this.maxValue6;
      this.maxValue6 = this.tempValue;
    }
    }
    if(n === 7){
      this.minValue7 = +(<HTMLInputElement>document.querySelector('#'+t1)).value;
    this.maxValue7 = +(<HTMLInputElement>document.querySelector('#'+t2)).value;
    if(this.minValue7 > this.maxValue7){
      this.tempValue = this.minValue7;
      this.minValue7 = this.maxValue7;
      this.maxValue7 = this.tempValue;
    }
    }
    
  }

  productList: any = [];
  
  searchInfo: advancedSearchInfo = {
    type: 'Commercial',
    application: 'Indoor',
    mountingLocation: 'Roof',
    accessories: 'With light',
    yearStart: 0,
    yearEnd: 0,
    airflowMin: 0,
    airflowMax: 0,
    powerMin: 0,
    powerMax: 0,
    soundMin: 0,
    soundMax: 0,
    diameterMin: 0,
    diameterMax: 0,
    heightMin: 0,
    heightMax: 0,
    productBrand: 'HVAC Fans'
  };

  selectedProducts: any[] = [];
  
  constructor(private route: ActivatedRoute, private authService: AuthService,
     private router: Router, private elementRef: ElementRef, 
     private searchService: SearchService, private location: Location) { }


  toggleArrowRotation1() {
    this.arrowRotated1 = !this.arrowRotated1;
  }
  toggleArrowRotation2() {
    this.arrowRotated2 = !this.arrowRotated2;
  }
  toggleArrowRotation3() {
    this.arrowRotated3 = !this.arrowRotated3;
  }
  toggleArrowRotation4() {
    this.arrowRotated4 = !this.arrowRotated4;
  }
  toggleArrowRotation5() {
    this.arrowRotated5 = !this.arrowRotated5;
  }

  logOut(){
    this.authService.logout();
    alert('Log out success!');
    this.router.navigate(['login']);
  }

  goToProductInfo(product: any){
    this.router.navigate(['product-info', JSON.stringify(product)]);
  }

  advancedSearch(){
    this.searchService.advancedSearch(this.searchInfo).subscribe(
      {
        next: response => {
          console.log(response);
          // this.router.navigate(['/product', JSON.stringify(response)]);
          this.router.navigate(['/product', JSON.stringify(response)]).then(() => {
            window.location.reload(); // Reload the page
          });
        },
        error: error => {
          console.error(error);
        }
      }
      );
  }

  reset(){
    this.searchService.getProductInfoByBrand(this.searchInfo.productBrand).subscribe(
      {
        next: response => {
          console.log(response);
          this.router.navigate(['/product', JSON.stringify(response)]).then(() => {
            window.location.reload(); // Reload the page
          });
        },
        error: error => {
          console.error(error);
        }
      }
    );
  }

  onProductSelected(product: any): void {
    if (product.isSelected) {
      this.selectedProducts.push(product);
    } else {
      const index = this.selectedProducts.findIndex(p => p === product);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);
      }
    }
    console.log(this.selectedProducts);
  }

  compare(){
    if(this.selectedProducts.length < 2){
      alert('Please select at least 2 products!');
    }else{
      this.router.navigate(['product-compare', JSON.stringify(this.selectedProducts)]);
    }
  }

  findMaxAndMinOfTechnicalDetails(type: string){
    switch(type)  
    {  
      case 'airflow':  
        const airflowArr: number[] = [];
        for (const p of this.productList) {
          airflowArr.push(p.airflow);
        }
        this.minAirflow = Math.min(...airflowArr);
        this.maxAirflow = Math.max(...airflowArr);
        break;
      case 'power':  
        const powerArr1: number[] = [];
        for (const p of this.productList) {
          powerArr1.push(p.power);
        }
        const powerArr2: number[] = [];
        for (const p of this.productList) {
          powerArr2.push(p.powerMin);
        }
        this.minPower = Math.min(...powerArr2);
        this.maxPower = Math.max(...powerArr1);
        break;  
      case 'sound':  
        const soundArr: number[] = [];
        for (const p of this.productList) {
          soundArr.push(p.sound);
        }
        this.minSound = Math.min(...soundArr);
        this.maxSound = Math.max(...soundArr);  
        break;  
      case 'diameter':  
        const diameterArr: number[] = [];
        for (const p of this.productList) {
          diameterArr.push(p.diameter);
        }
        this.minDiameter = Math.min(...diameterArr);
        this.maxDiameter = Math.max(...diameterArr);  
        break;  
      case 'height':  
        const heightArr1: number[] = [];
        for (const p of this.productList) {
          heightArr1.push(p.height);
        }
        const heightArr2: number[] = [];
        for (const p of this.productList) {
          heightArr2.push(p.heightMin);
        }
        this.minHeight = Math.min(...heightArr2);
        this.maxHeight = Math.max(...heightArr1);
        break;  
      case 'year':  
        const yearArr: number[] = [];
        for (const p of this.productList) {
          const yearSubstring = p.modelYear.substring(0, 4);
          const yearNumber = parseInt(yearSubstring, 10);
          yearArr.push(yearNumber);
        }
        this.searchInfo.yearStart = Math.min(...yearArr);
        this.searchInfo.yearEnd = Math.max(...yearArr);
        break;    
      default:  
        break;  
    }  
    
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productListString = params.get('productList');
      if (productListString) {
        this.productList = JSON.parse(productListString);
      }
    });
    this.findMaxAndMinOfTechnicalDetails('airflow');
    this.findMaxAndMinOfTechnicalDetails('power');
    this.findMaxAndMinOfTechnicalDetails('sound');
    this.findMaxAndMinOfTechnicalDetails('diameter');
    this.findMaxAndMinOfTechnicalDetails('height');
    this.findMaxAndMinOfTechnicalDetails('year');

    this.minValue1 = this.minAirflow;
    this.maxValue1 = this.maxAirflow;
    this.minValue2 = this.minPower;
    this.maxValue2 = this.maxPower;
    this.minValue3 = this.minSound;
    this.maxValue3 = this.maxSound;
    this.minValue4 = this.minDiameter;
    this.maxValue4 = this.maxDiameter;
    this.minValue5 = this.minValue4;
    this.maxValue5 = this.maxValue4;

    this.searchInfo.airflowMin = this.minAirflow;
    this.searchInfo.airflowMax = this.maxAirflow;
    this.searchInfo.powerMax = this.maxPower;
    this.searchInfo.powerMin = this.minPower;
    this.searchInfo.soundMax = this.maxSound;
    this.searchInfo.soundMin = this.minSound;
    this.searchInfo.diameterMax = this.maxDiameter;
    this.searchInfo.diameterMin = this.minDiameter;
    this.searchInfo.heightMax = this.maxHeight;
    this.searchInfo.heightMin = this.minHeight;

  }
  

}
