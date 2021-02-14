import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  responseData: Object;
  labels: Object;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.responseData = this.route.snapshot.data.menuData['menu'];
    this.labels=this.route.snapshot.data.menuData['labels'];
    
  }

  getLabel(id):string{
    return this.labels[id as string];
  }

}
