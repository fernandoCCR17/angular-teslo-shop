import { Component } from '@angular/core';
import { FrontProductCard } from "../../components/front-product-card/front-product-card";

@Component({
  selector: 'app-home-page',
  imports: [FrontProductCard],
  templateUrl: './home-page.html',
})
export class HomePage { }
