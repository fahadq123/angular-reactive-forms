import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenEmailsList = [
    'asd@asd.com',
    'test@mail.com'
  ];

  ngOnInit() {
    this.signupForm = new FormGroup({
      formGroup: new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [
          Validators.required,
          Validators.email,
          this.forbiddenEmails.bind(this)]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // Custom validator: the return type here is a TS way of saying that
  // function would return a JS object with key as a string and value of the key would be boolean.
  forbiddenEmails(control: FormControl): { [s: string]: boolean } {
    // we need to check that control value is not part of the forbiddenEmailsList array hence -1.
    if (this.forbiddenEmailsList.indexOf(control.value) !== -1) {
      return {'emailIsForbidden': true}
    } else {
      // it should not return false, should return null or nothing in case validator is false
      return null;
    }
  }
}
