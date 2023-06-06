import { NgModule, Pipe } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './shared/auth.guard';
import { ProductComponent } from './product/product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductCompareComponent } from './product-compare/product-compare.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'product/:productList', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product-info/:productDetail', component: ProductInfoComponent, canActivate: [AuthGuard] },
  { path: 'product-info/:section', component: ProductInfoComponent, canActivate: [AuthGuard] },
  { path: 'product-compare/:compareInfo', component: ProductCompareComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
