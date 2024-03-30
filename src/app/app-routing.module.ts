import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { UpdateComponent } from './update/update.component';
import { authGuard } from './auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent },
  { path: 'update', component: UpdateComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
