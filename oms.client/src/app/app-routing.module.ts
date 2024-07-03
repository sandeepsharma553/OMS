import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddComponent } from './components/employee/add/add.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'login'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component:AddComponent 
},
{
  path: '',
  component: NavBarComponent,
  children: [
    {
      path: 'register',
      loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule)

    }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
