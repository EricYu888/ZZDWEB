import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
 
export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [{
      path: '',
      loadChildren: './views/login/login.module#LoginModule'
    }]
  },
  {
    path: 'logout',
    component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [{
      path: '',
      loadChildren: './views/logout/logout.module#LogoutModule'
    }]
  },

  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: '主页'
    },
    children: [
      {
        path: 'relation',
        canActivate: [AuthGuard],
        loadChildren: './views/relation/relation.module#RelationModule'
      }
    ]
  },
  {
    path: '**',
    component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [{
      path: '',
      loadChildren: './views/404/404.module#_404Module'
    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
