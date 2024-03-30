import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { TokenData } from '../services/token.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  isLoading: boolean = false;
  isUpdated: boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  updateTokenData(): void {
    this.isLoading = true;
    this.isUpdated = false;
    this.tokenService.updateTokenData().subscribe({
      next: () => {
        this.isLoading = false;
        this.isUpdated = true;
        setTimeout(() => {
          this.isUpdated = false;
        }, 3000); // Hide the alert after 3 seconds
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error updating token data:', err);
      }
    });
  }
}
