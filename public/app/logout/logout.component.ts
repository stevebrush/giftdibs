import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SessionService } from '../shared/services/';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private http: Http,
    private router:Router,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.logout()
      .then(data => {
        alert(data.message);
        this.router.navigate(['/']);
      });
  }
}
