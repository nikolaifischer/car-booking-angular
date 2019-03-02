import { AppPage } from './app.po';
import { browser } from 'protractor';

/**
 * E2E tests, to check if app built correctly and basic interactions work */

describe('/home tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message on homepage', () => {
    page.navigateTo('/');
    expect(page.getTitleText()).toEqual('Welcome to Car Booking');
  });

  it('should display call to action on homepage', () => {
    page.navigateTo('/');
    expect(page.getCTAText()).toEqual('Book your favorite car and lets go!');
  });

  it('should display call to action button on homepage', () => {
    page.navigateTo('/');
    expect(page.getCTAButton().getText()).toEqual('BOOK A CAR');
  });


  it('should display messages on Landing Page Message cards page', () => {
    page.navigateTo('/');
    expect(page.getLandingMessageCards(1)).toEqual('Rides on tap');
    expect(page.getLandingMessageCards(2)).toEqual('Fair Prices');
    expect(page.getLandingMessageCards(3)).toEqual('Safety first');
  });

  it('should navigate to car-list when pressing book now button', () => {
    page.navigateTo('/');
    page.getCTAButton().click();
    expect(browser.getCurrentUrl()).toContain('/cars');
  });

});

describe('/cars tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load cars from the backend', () => {
    page.navigateTo('/cars');
    expect(page.getCarCards()).toBeDefined();
  });

  it('should load details for a car', () => {
    page.navigateTo('/cars');
    page.getCarCardsButton().click();
    expect(browser.getCurrentUrl()).toContain('/cars/details');
  });

  it('should load an image for a car', () => {
    page.navigateTo('/cars/details/5');
    const img = page.getCarPicture();
    expect(img).toBeDefined();
  });

  it('should render Book Now Button', () => {
    page.navigateTo('/cars/details/5');
    const btn = page.getBookNowButton();
    expect(btn).toBeDefined();
  });

  it('should open booking dialog', () => {
    page.navigateTo('/cars/details/5');
    page.openBookingDialog();
    expect(page.getBookingDialog()).toBeDefined();
  });

  it('should step through the booking process', () => {
    page.navigateTo('/cars/details/5');
    page.openBookingDialog();
    browser.sleep(1000);
    page.getFirstStepNextButton().click();
    browser.sleep(1000);
    page.getSecondtStepNextButton().click();
    browser.sleep(1000);
    const confirmBtn = page.getConfirmButton();
    expect(confirmBtn).toBeDefined();
    expect(page.getBookingConfirmationStartDate().getText()).toContain('9:00');
    expect(page.getBookingConfirmationEndDate().getText()).toContain('9:00');
    expect(page.getBookingConfirmationDuration().getText()).toBe('1');
  });
});

describe('/bookings tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should open booking dialog', () => {
    page.navigateTo('/bookings/');
    const headline = page.getBookingListHeadline();
    expect(headline.getText()).toBe('My Bookings');
  });
  it('should render booking example data', () => {
    page.navigateTo('/bookings/');
    const txt = page.getFirstPastBooking().getText();
    expect(txt).toContain('intive_Kupferwerk 1');
  });

  it('should open booking details', () => {
    page.navigateTo('/bookings/');
    page.getFirstPastBookingDetailsBtn().click();
    expect(browser.getCurrentUrl()).toContain('/bookings/details/');
  });

  it('render bookings detail card', () => {
    page.navigateTo('/bookings/details/0');
    const bookingDetailsCard = page.getBookingDetailCard();
    expect(bookingDetailsCard).toBeDefined();
  });

  it('render bookings detail card', () => {
    page.navigateTo('/bookings/details/0');
    const carInformation = page.getCarInformation();
    expect(carInformation).toBeDefined();
  });

});

