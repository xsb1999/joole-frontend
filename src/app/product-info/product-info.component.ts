import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  productDetail: any;
  activeSection: string = 'summary';
  img1: string = "../../assets/pics/fan1.png";
  img2: string = "../../assets/pics/fan2.png";
  img3: string = "../../assets/pics/fan3.png";
  img4: string = "../../assets/pics/fan4.png";
  rows: string[] = [
    'Airfoils – Moso bamboo – 60” diameter',
    'Airfoil Finishes – Caramel Bamboo or Cocoa Bamboo',
    'Hardware Finishes – Satin Nickel, Oil-Rubbed Bronze, Black or White',
    'Motor – EC motor with digital inverter drive',
    'Exceeds ENERGY STAR fan efficiency requirements by up to 1200%',
    'Controls – Remote control Remote control (included), Haiku Home mobile app, Haiku Wall Control (optional), or Amazon Alexa-enabled devices (optional)',
    'Onboard Sensors – Ambient and surface temperature, relative humidity, and passive infrared sensors enable SenseME technology. Technology lets you automate your fan’s operation to maximize convenience and energy savings',
    'Environment – Indoor use only.',
    'Accessories – Haiku Light Kit and Haiku Wall Control. See respective spec sheets for details. A Tall Ceiling Kit and Stabilizer Kit are available for ceilings 14 feet (4.3 meters) or taller.',
    'Patented LED light module (optional) seamlessly integrates with the body of the fan',
    'Made in the U.S.A.'
  ];
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){
  }
  logOut(){
    this.authService.logout();
    alert('Log out success!');
    this.router.navigate(['login']);
  }

  scrollToSection(section: string) {
    this.activeSection = section;
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productDetail1 = params.get('productDetail');
      if (productDetail1) {
        this.productDetail = JSON.parse(productDetail1);
      }
    });
    console.log(this.productDetail);
  }
  
}
