import { Component } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  private isAuthenticatedSubscription!: Subscription;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.tokenService.isAuthenticated$
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
