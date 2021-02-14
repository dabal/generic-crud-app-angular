import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CrudService } from './crud/crud.service';

import { Token } from './crud/token';


@Injectable({
  providedIn: 'root'
})
export class GetAllObjectsForView implements Resolve<Object[]> {
  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Object[]> | Promise<Object[]> | Object[] {



    return this.crudService.getAll(route.params.viewId, route.queryParams);
  }
}


@Injectable({
  providedIn: 'root'
})
export class GetObjectForViewById implements Resolve<Object> {
  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Object> | Promise<Object> | Object {
   return this.crudService.getById(route.params.viewId, +route.params.objectId);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetToken implements Resolve<Token> {
  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Token> | Promise<Token> | Token {
   return this.crudService.getToken(route.params.ssoToken);
  }
}


@Injectable({
  providedIn: 'root'
})
export class GetViews implements Resolve<Object> {
  constructor(private crudService: CrudService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Object | Observable<Object> {

  return this.crudService.getViewsForMenu();
  }
}

