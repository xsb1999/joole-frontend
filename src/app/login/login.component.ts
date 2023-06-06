import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../shared/password.validator';
import { ForbiddenNameValidator } from '../shared/user-name.validator';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, 
    private _employeeService: EmployeeService, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      userPassword: ['']
    }, { validator: PasswordValidator } as AbstractControlOptions
    );
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this._employeeService.login(this.loginForm.value)
      .subscribe(
        {
          next: response => {
            this.authService.saveToken(response);
            localStorage.setItem('user', this.loginForm.value['userName']);
            alert('Log in success!');
            this.router.navigate(['search']);
          },
          error: error => {
            alert('Incorrect username or password!');
          }
        }
      );
  }
}
