import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [DatePipe]
})
export class FiltersComponent implements OnInit {

  Object = Object;
  responseData: Object;
  form: FormGroup;
  viewId: String;
  objectId: Number;
  columns: any[];
  dropdownFields: any;
  dateColumns: string[];
  format: string = "yyyy-MM-dd";
  filterValues: any;



  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(
      (params) => {
        if (params['viewId']) {
          this.viewId = params['viewId'];

        }
        if (params['objectId']) {
          this.objectId = params['objectId'];

        }

      }
    );

    this.responseData = this.route.snapshot.data.responseData;
    this.columns = Object.keys(this.responseData['meta']['filters']);

    this.form = this.formBuilder.group({});
    this.dateColumns = [];
    Object.keys(this.responseData['meta']['filters']).forEach(column => {
      
      this.form.addControl(column, new FormControl());
      if (this.responseData['meta']['filters'][column]['type'] === 'date_picker') {
        this.dateColumns.push(column);
      }
    }
    );
    this.route.queryParams.subscribe((params) => {
      let newValue = {};
      this.columns.forEach((column) => {

        if (params[column] != undefined) { newValue[column] = params[column] }
      });
      this.filterValues = newValue;
      if(Object.keys(this.filterValues).length>0){this.form.patchValue(this.filterValues);}
      
    });
    this.dropdownFields = { "text": "value", "value": "key" };




  }

  onSubmit() {

    var body = this.form.value;
    this.dateColumns.forEach((x) => { body[x] = this.datePipe.transform(body[x], 'yyyy-MM-dd'); })
    
    this.router.navigate([], {
      queryParams: body,
      queryParamsHandling: 'merge',
    });
  }


}







