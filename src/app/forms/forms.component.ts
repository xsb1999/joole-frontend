import { TestService } from './../services/test.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  topics = ['Angular', 'React', 'JS'];
  userModel = new User('Rob', 'rob@test.com', 1111111111, 'Angular');
  topicHasError: boolean = false;
  constructor(private testService: TestService) { }

  ngOnInit(): void {
  }
  validateTopic(value: string) {
    if (value == "default") {
      this.topicHasError = true;
      return true;
    } else {
      this.topicHasError = false;
      return false;
    }
  }


  // onSubmit() {
  //   this.testService.enroll(this.userModel).subscribe(
  //     {
  //       next: data => console.log('success', data),
  //       error: err => console.error('error', err)
  //     }
  //   )
  // }

  onSubmit() {
    console.log(this.userModel);
  }



}
