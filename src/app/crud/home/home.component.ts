import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { DialogEditEventArgs, SaveEventArgs, GridComponent } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class HomeComponent implements OnInit {

  Object = Object;
  responseData: object;
  viewId: string;
  columns: string[];
  actions: string[];
  pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public dataManager: DataManager = new DataManager({
    url: 'Home/UrlDatasource',
    updateUrl: 'Home/Update',
    insertUrl: 'Home/Insert',
    removeUrl: 'Home/Delete',
    adaptor: new UrlAdaptor()
  });
  public editForm: FormGroup;
  title: string;
  dropdownFields: any;
  @ViewChild('grid') Grid: GridComponent;
  visibleGrid: boolean = true;
  showSucces: boolean; 





  constructor(public crudService: CrudService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params['viewId']) {
          this.viewId = params['viewId'];
        }
        this.route.parent.data.subscribe((data) => {
          if (data['menuData']) {
            this.title = data['menuData']['labels'][this.viewId];
          }
        });
      }
    );
    this.route.data.subscribe((data) => {
      if (data['responseData']) {
        this.visibleGrid = false;
        this.showSucces=false;
        this.responseData = data.responseData;
        this.columns = Object.keys(this.responseData['meta']['columns']);
        this.actions = this.responseData['meta']['available_actions_in_list_view'];
        this.pageSettings = {};
        this.toolbar = ['Search'];
        this.editSettings = { showDeleteConfirmDialog: true, mode: 'Dialog', allowAdding: false, allowDeleting: false, allowEditOnDblClick: false, allowEditing: false, allowNextRowEdit: false };
        this.responseData['meta']['available_actions_in_list_view'].forEach(element => {
          if (element === 'Edit') {
            this.editSettings['allowEditing'] = true;
            this.editSettings['allowEditOnDblClick'] = true;
          }
          else if (element === 'Add') {
            this.editSettings['allowAdding'] = true;
          }
          else if (element === 'Delete') {
            this.editSettings['allowDeleting'] = true;
          }
          // tu dodac poznieja nastepne obslugiwane akcje
          this.toolbar.push(element);

        });
        setTimeout(() => this.visibleGrid = true, 100);
      }
    });
    this.dropdownFields = { "text": "value", "value": "key" };
  }




  hasEditAction(): boolean {
    return this.actions.includes('edit');
  }

  actionComplete(args) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      if (args.dialog != undefined) {
        const dialog = args.dialog;
        dialog.header = "edycja";
        dialog.width = "540px";
      }
    }
    if ((args.requestType === 'save' && args.action === 'edit' && args.cancel === false)) {
      var input = args.data;
      this.crudService.update(input['id'], this.viewId, input).subscribe((transl: Object) => {
        this.route.queryParams.subscribe((param) => {
          this.crudService.getAll(this.viewId, param).subscribe((t: {}) => { this.responseData = t; });
        });
        this.showSucces=true;
        setTimeout(()=>{this.showSucces=false;},3000);
      });
    }
    if ((args.requestType === 'save' && args.action === 'add' && args.cancel === false)) {
      var input = args.data;
      this.crudService.update(input['id'], this.viewId, input).subscribe((transl: Object) => {
        this.route.queryParams.subscribe((param) => {
          this.crudService.getAll(this.viewId, param).subscribe((t: {}) => { this.responseData = t; });
        });
        this.showSucces=true;
        setTimeout(()=>{this.showSucces=false;},3000);
      });
    }
    if ((args.requestType === 'delete' && args.cancel === false)) {
      var input = args.data[0];
      this.crudService.delete(input['id'], input, this.viewId).subscribe((transl: Object) => {
        this.route.queryParams.subscribe((param) => {
          this.crudService.getAll(this.viewId, param).subscribe((t: {}) => { this.responseData = t; });
        });
        this.showSucces=true;
        setTimeout(()=>{this.showSucces=false;},3000);
      });
    }

  }

  getColumnWidth(name: string): number {
    return this.responseData['meta']['columns'][name]['width'] == undefined ? 50 : this.responseData['meta']['columns'][name]['width'];
  }

  getColumnType(name: string): string {
    return this.responseData['meta']['columns'][name]['type'] == undefined ? "other" : this.responseData['meta']['columns'][name]['type'];
  }

  getColumnVisibility(name: string): boolean {
    return this.responseData['meta']['columns'][name]['visible'] == undefined ? true : this.responseData['meta']['columns'][name]['visible'];
  }

  hasFilters(): boolean {
    return (this.responseData['meta']['filters'] != undefined);
  }

  createFormGroup(rowData: any): FormGroup {
    let editForm = new FormGroup({});
    Object.keys(this.responseData['meta']['columns']).forEach(column => {
      if (this.responseData['meta']['columns'][column]['readOnly'] == true) {
        editForm.addControl(column, new FormControl({ value: null, disabled: true }));
      }
      else {
        editForm.addControl(column, new FormControl(''));
      }
    });
    if (rowData != null) {
      editForm.setValue(rowData);
    }
    return editForm;
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit') {
      this.editForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === 'add') {
      this.editForm = this.createFormGroup(null);
    }
    if (args.requestType === 'save') {
      if (this.editForm.valid) {
        args.data = this.editForm.value;
      } else {
        args.cancel = true;
      }
    }
  }

}