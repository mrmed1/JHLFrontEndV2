import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private fb: FormBuilder) { }

  formGroup = this.fb.group({
    id: [null],
    Nom: ['', Validators.required],
    Login: ['', Validators.required],
    Password: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(30)]],
    ConfirmPassword: ['', [Validators.required ]],
    Prenom: ['', Validators.required],
    NomCommercial: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Tel: ['', [Validators.required, Validators.pattern('[0-9 ]{8}')]],
    Gouvernorat: new FormControl('', Validators.required),
    Ville: new FormControl('', Validators.required)
  }, { validator: this.passwordMatchValidator('Password', 'ConfirmPassword')});


  get id(){
    return this.formGroup.get('id');
  }

  get Nom(){
    return this.formGroup.get('Nom');
  }

  get Prenom(){
    return this.formGroup.get('Prenom');
  }
  get Tel() {
    return this.formGroup.get('Tel');
  }
  get Email(){
    return this.formGroup.get('Email');
  }
  get Gouvernorat(){
    return this.formGroup.get('Gouvernorat');
  }

  get Login(){
    return this.formGroup.get('Login');
  }

  get Password(){
    return this.formGroup.get('Password');
  }
  get Ville(){
    return this.formGroup.get('Ville');
  }
  get NomCommercial(){
    return this.formGroup.get('NomCommercial');
  }
  get ConfirmPassword(){
    return this.formGroup.get('ConfirmPassword');
  }
  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: any) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
