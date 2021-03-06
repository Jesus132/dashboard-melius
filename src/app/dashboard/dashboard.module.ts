import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridstackModule } from '@libria/gridstack';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GridWidgetComponent } from './grid-widget/grid-widget.component';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [DashboardComponent, GridWidgetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DashboardRoutingModule,
    GridstackModule.forRoot(),
    NgApexchartsModule,
  ]
})
export class DashboardModule { }
