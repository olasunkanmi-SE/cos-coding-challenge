import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { AuctionService } from './auction.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MdComponentsModule } from 'src/app/md-components/md-components-routing.module';

describe('AuctionService', () => {
  let service: AuctionService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MdComponentsModule,
      ],
      providers: [AuthService],
    });
    service = TestBed.inject(AuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
