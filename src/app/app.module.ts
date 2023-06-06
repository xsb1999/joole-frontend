import { EmployeeService } from './services/employee.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { SearchService } from './services/search.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductService } from './product.service';
import { ProductCompareComponent } from './product-compare/product-compare.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    FormsComponent,
    ReactiveFormComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    ProductComponent,
    ProductInfoComponent,
    ProductCompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,
              SearchService,
              ProductService,
            {
              provide: HTTP_INTERCEPTORS,
              useClass: AuthInterceptor,
              multi: true
            }],
  bootstrap: [AppComponent]
})
export class AppModule { }
