import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  Object = Object;
  responseData: Object;
  form: FormGroup;
  viewId: String;
  objectId: Number;
  columns: String[];



  constructor(private formBuilder: FormBuilder, private router: Router, public crudService: CrudService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
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
    this.columns = Object.keys(this.responseData['meta']['columns']);

    this.form = this.formBuilder.group({});

    Object.keys(this.responseData['meta']['columns']).forEach(column => {
      
      if (this.responseData['meta']['columns'][column]['readOnly'] == true) {
        this.form.addControl(column, new FormControl({ value: null, disabled: true }));
      }
      else {
        this.form.addControl(column, new FormControl(''));
      }

    });


    this.form.setValue(this.responseData['data']);


  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
    // this.translation = this.form.value;
    this.crudService.update(this.objectId, this.viewId, this.form.getRawValue()).subscribe((transl: Object) => { this.router.navigate(['/dashboard/crud/'+this.viewId]) });
  }

  gotoMain() {
    this.router.navigate(['/dashboard/crud/'+this.viewId]);
  }


}
