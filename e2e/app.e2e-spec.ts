import { ParkingBookingPage } from './app.po';

describe('parking-booking App', function() {
  let page: ParkingBookingPage;

  beforeEach(() => {
    page = new ParkingBookingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
