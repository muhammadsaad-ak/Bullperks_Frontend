import { Component, OnInit } from '@angular/core';
import { TokenService, TokenData } from '../services/token.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  tokenData!: TokenData;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.fetchTokenData();
  }

  fetchTokenData(): void {
    this.tokenService.getTokenData().subscribe({
      next: (data: TokenData) => {
        this.tokenData = data;
        this.formatAmounts();
      },
      error: (err: any) => { console.error('Error fetching token data:', err) }
    });
  }

  formatAmounts(): void {
    // Format total supply
    this.tokenData.totalSupply = parseFloat(this.formatWeiAmount(this.tokenData.totalSupply));
    // Format circulating supply
    this.tokenData.circulatingSupply = parseFloat(this.formatWeiAmount(this.tokenData.circulatingSupply));
  }


  formatWeiAmount(amount: number): string {
    // Convert amount from wei to ether (1 ether = 10^18 wei)
    const etherAmount = amount / Math.pow(10, 18);
    // Format amount with commas and round to 2 decimal places
    return etherAmount.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
}
