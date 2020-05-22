import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  regForm: FormGroup;
  ngOnInit(): void {
    this.regForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, emailValid()]],
        password: ['', Validators.required],
        _password: ['', Validators.required],
      },
      { validator: matchingField('password', '_password') }
    );
  }
  onSubmit() {
    console.log(this.regForm.errors);
    this.auth.register(this.regForm.value);
  }
}

function matchingField(field1, field2) {
  return (form) => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return { mismatchedFields: true };
    }
  };
}

function emailValid() {
  return (control) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(control.value) ? null : { invalidEmail: true };
  };
}
