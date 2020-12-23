import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    DirectivesModule
  ]
})
export class HomeModule { }
