import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionComponent } from './auction.component';
import { MdComponentsModule } from '../md-components/md-components-routing.module';

@NgModule({
  declarations: [AuctionComponent],
  imports: [CommonModule, AuctionRoutingModule, MdComponentsModule],
})
export class AuctionModule {}
