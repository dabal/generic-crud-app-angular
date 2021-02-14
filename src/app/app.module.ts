import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent } from './crud/home/home.component';
import {DetailsComponent } from './crud/details/details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SSOTokenComponentComponent } from './ssotoken-component/ssotoken-component.component';
import { ErrorComponent } from './error/error.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';

import { HttpErrorInterceptor } from './http-error.interceptor';
import {APP_BASE_HREF} from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SortService, SearchService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { FiltersComponent } from './filters/filters.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    SSOTokenComponentComponent,
    ErrorComponent,
    MenuComponent,
    DashboardComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GridModule,
    DropDownListModule,
    DatePickerModule,
    TextBoxModule,
    RichTextEditorModule,
    ComboBoxModule
  ],
  providers: [ {

    provide: HTTP_INTERCEPTORS,

    useClass: HttpErrorInterceptor,

    multi: true

  },
  {provide: APP_BASE_HREF, useValue: '/app'},
   SortService, SearchService, ToolbarService, EditService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
