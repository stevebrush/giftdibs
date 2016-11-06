import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './shared/services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router) { }

  canActivate(): boolean {
    let canActivate = this.sessionService.getStatus();
    if (!canActivate) {
      this.router.navigate(['/login']);
    }
    return canActivate;
  }
}
