import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path: string) {
    return browser.get(path);
  }

  openBookingDialog() {
    return this.getBookNowButton().click();
  }

  getTitleText() {
    return element(by.css('h1')).getText();
  }

  getCTAText() {
    return element(by.css('h3')).getText();
  }

  getCTAButton() {
    return element(by.css('button'));
  }

  getLandingMessageCards(index: number) {
    return element(by.css(`div.landing-messages-container > mat-card:nth-child(${index}) h2`)).getText();
  }

  getCarCards() {
    return element(by.css('.car-list-card'));
  }

  getCarCardsButton() {
    return element(by.css('app-car-list mat-card-actions button'));
  }

  getCarPicture() {
    return element(by.css('app-car-information > mat-card > img'));
  }

  getBookNowButton() {
    return element(by.css(' app-car-details button'));
  }

  getBookingDialog() {
    return element(by.css('#booking-dialog'));
  }

  getFirstStepNextButton() {
    return element(by.css('#next-button-1'));
  }

  getSecondtStepNextButton() {
    return element(by.css('#next-button-2'));
  }
  getConfirmButton() {
    return element(by.css('#cdk-step-content-0-2 > div:nth-child(2) > button:nth-child(2)'));
  }

  getBookingConfirmationStartDate() {
    return element(by.css('#cdk-step-content-0-2 > div.stepper-group.ng-star-inserted > p:nth-child(2) > span:nth-child(2)'));
  }

  getBookingConfirmationEndDate() {
    return element(by.css('#cdk-step-content-0-2 > div.stepper-group.ng-star-inserted > p:nth-child(3) > span:nth-child(2)'));
  }

  getBookingConfirmationDuration() {
    return element(by.css('#cdk-step-content-0-2 > div.stepper-group.ng-star-inserted > p:nth-child(4) > span:nth-child(2)'));
  }

  getBookingListHeadline() {
    return element(by.css('app-booking-list h1'));
  }

  getFirstPastBooking() {
    return element(by.css('mat-list-item.past-booking.mat-list-item.mat-2-line > div'));
  }

  getFirstPastBookingDetailsBtn() {
    return element(by.css('mat-list-item.past-booking.mat-list-item.mat-2-line > div > button'));
  }

  getBookingDetailCard() {
    return element(by.css('booking-details-card'));
  }

  getCarInformation() {
    return element(by.css('app-car-information'));
  }
}
