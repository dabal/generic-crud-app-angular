import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { SortService } from '@syncfusion/ej2-angular-grids';



@NgModule({
  declarations: [HomeComponent, DetailsComponent],
  imports: [
    CommonModule,
    GridModule

  ],
  providers: [

  ]

})
export class CrudModule { }
