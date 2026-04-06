import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {
  private _authService = inject(AuthService);

  authStatus = computed(() => this._authService.authStatus());
  user = computed(() => this._authService.user());

  logout = () => this._authService.logout();
}
