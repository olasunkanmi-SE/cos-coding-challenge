import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAuctionItem } from './interface/auction';
import { AuctionService } from './service/auction.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss'],
})
export class AuctionComponent implements OnInit {
  isLoading: boolean = true;
  private runningAuctions: Subscription | undefined;
  auctions: IAuctionItem[] = [];
  constructor(private auctionService: AuctionService) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getRunningAuctions();
  }

  getRunningAuctions() {
    this.runningAuctions = this.auctionService
      .getRunningAuctions()
      .subscribe((res) => {
        this.auctions = res.items;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.runningAuctions) {
      this.runningAuctions.unsubscribe();
    }
  }
}
