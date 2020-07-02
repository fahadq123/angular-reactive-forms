import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

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
        'username': new FormControl(null, Validators.required, this.forbiddenName.bind(this)),
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

  // Custom async validator
  // Ideally the validation should not be done at the front end and hence we need to reach out a web server
  // Web server is an async call therefore this is async custom validator example.
  // With this the control state switches from invalid --> pending --> response from server either valid or invalid.
  forbiddenName(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Fahad' || control.value === 'fahad') {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 2000);
    })
  }
}
