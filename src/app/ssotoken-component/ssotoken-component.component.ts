
import { CrudService } from '../crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Component, OnInit } from '@angular/core';
import { Token } from '../crud/token';
@Component({
  selector: 'app-ssotoken-component',
  templateUrl: './ssotoken-component.component.html',
  styleUrls: ['./ssotoken-component.component.css']
})
export class SSOTokenComponentComponent implements OnInit {
token: Token;

constructor( private router: Router, public crudService: CrudService, private route: ActivatedRoute) { }

ngOnInit(): void {
  
  this.token = this.route.snapshot.data.token;
  
  if (this.token != null) {
    localStorage.setItem('token', JSON.stringify(this.token));
    this.router.navigate(['/']);
  }
  else{
    this.router.navigate(['/error']);
  }
  

}
}
