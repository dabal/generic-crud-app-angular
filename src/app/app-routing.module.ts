import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './crud/home/home.component';
import { DetailsComponent } from './crud/details/details.component';
import { environment } from '../environments/environment';
import { GetAllObjectsForView, GetObjectForViewById, GetToken, GetViews } from './route.resolve.service';
import { SSOTokenComponentComponent } from './ssotoken-component/ssotoken-component.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: 'dashboard/crud/translations', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, resolve: { 'menuData': GetViews }, children: [
      { path: 'crud/:viewId', component: HomeComponent, resolve: { 'responseData': GetAllObjectsForView },
      runGuardsAndResolvers: 'always' },
    { path: 'crud/:viewId/update/:objectId', component: DetailsComponent, resolve: { 'responseData': GetObjectForViewById } }]
  },

  { path: 'sso/login/:ssoToken', component: SSOTokenComponentComponent, resolve: { 'token': GetToken } }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
