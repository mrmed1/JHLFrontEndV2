import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/sb-admin-2.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
  }




  validateAllFormFields(formGroup: FormGroup)
  {Object.keys(formGroup.controls).forEach(field =>
  {const control = formGroup.get(field);
   if (control instanceof FormControl)
    {control.markAsTouched({ onlySelf: true }); }
    else if (control instanceof FormGroup)
    {this.validateAllFormFields(control); }});
  }

  onSubmit() {

  }
}
