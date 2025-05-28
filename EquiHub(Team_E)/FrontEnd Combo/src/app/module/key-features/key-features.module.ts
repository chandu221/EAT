import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyFeaturesRoutingModule } from './key-features-routing.module';
import { TrendComponent } from '../../dashboard/main-dashboard/components/trend/trend.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KeyFeaturesRoutingModule,
    TrendComponent
  ]
})
export class KeyFeaturesModule { }
