import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../shared/password.validator';
import { ForbiddenNameValidator } from '../shared/user-name.validator';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private _employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), ForbiddenNameValidator(/password/)]],
      userPassword: ['',[Validators.required]],
      confirmPassword: [''],
      userRole: ['DESIGNER']
    }, { validator: PasswordValidator } as AbstractControlOptions
    );
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get userPassword() {
    return this.registrationForm.get('userPassword');
  }

  get userRole() {
    return this.registrationForm.get('userRole');
  }


  backToLogin() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this._employeeService.register(this.registrationForm.value)
      .subscribe(
        {
          next: response => {
            alert(response);
            this.backToLogin();
          },
          error: error => {
            console.error('Error!', error);
            alert(error);
          }
        }
      ); 
  }

  // onSubmit() {
  //   console.log(this.registrationForm.value);
  //   this._employeeService.register(this.registrationForm.value)
  //     .subscribe(
  //       {
  //         next: response => console.log('Success!', response),
  //         error: error => console.error('Error!', error),
  //       }
  //     );
  // }

}
