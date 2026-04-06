import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { patternPassword } from '@app/auth/helpers';
import { AuthService } from '@app/auth/services/auth.service';
import { Alert } from '@app/shared/components/alerts/alert/alert';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, NgClass, Alert],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  messageError = signal('Información incorrecta, favor de llenar el formulario correctamente.');

  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(patternPassword)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(patternPassword)]],
  });
  
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    console.log(password);
    console.log(confirmPassword)

    return password === confirmPassword;;
  }

  onSubmit(){
    if (this.registerForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    if(!this.passwordMatchValidator(this.registerForm)) {
      this.hasError.set(true);
      this.messageError.set('Las contraseñas no coinciden, verifique la información.');

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);

      return;
    }

    const { email, password, fullName } = this.registerForm.value;
    
    this._authService.register(email!, password!, fullName!).subscribe((isAuthenticated) => {
      if(isAuthenticated) {
        this.hasError.set(false);
        this._router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      this.messageError.set('No se pudo registrar el usuario, intente nuevamente.');
    });
  }
}
