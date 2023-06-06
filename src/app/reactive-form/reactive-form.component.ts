import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControlOptions } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TestService } from '../services/test.service';
import { PasswordValidator } from '../shared/password.validator';
import { ForbiddenNameValidator } from '../shared/user-name.validator';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})

export class ReactiveFormComponent implements OnInit {

  registrationForm!: FormGroup;
  // // create form control instance manully -> become repeatitive 
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Emily'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   // nested form group
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });
  constructor(private fb: FormBuilder, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), ForbiddenNameValidator(/password/)]],
      password: [''],
      confirmPassword: [''],
      email: [''],
      subscribe: [false],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, { validator: PasswordValidator } as AbstractControlOptions
    );

    this.registrationForm.get('subscribe')?.valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  loadAPIData() {
    // set some default value for user/ fetch from server/ 
    // require you to pass all the form control values
    // this.registrationForm.setValue(
    //   {
    //   userName: 'Bruce',
    //   password: 'test',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //     postalCode: '123456'
    //   }
    // }
    // );

    // assign some of the fildes
    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test'
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this._employeeService.register(this.registrationForm.value)
      .subscribe(
        {
          next: response => console.log('Success!', response),
          error: error => console.error('Error!', error),
        }
      );
  }

}