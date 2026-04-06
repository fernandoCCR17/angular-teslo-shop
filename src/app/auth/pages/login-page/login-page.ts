import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Alert } from '@app/shared/components/alerts/alert/alert';
import { AuthService } from '@app/auth/services/auth.service';
import { NgClass } from '@angular/common';
import { patternPassword } from '@app/auth/helpers';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, Alert, NgClass],
  templateUrl: './login-page.html',
})
export class LoginPage {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(patternPassword)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email, password } = this.loginForm.value;
    
    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if(isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
    })
    
    this.isPosting.set(true);
  }
}
