import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * Main Component of this app. Renders navigation.
 */
export class AppComponent {
  constructor(private router: Router){}
  title = 'car-booking-angular';

  navLinks = [{path: '/home', label: 'Home'}, {path: '/cars', label: 'Available Cars'}, {path: '/bookings', label: 'My Bookings'}];

  /**
   * Executed when a new route activates in the outlet
   * Scrolls the viewport of the browser to the top.
   * @param event routing event
   */
  onActivateRoute(event) {
    window.scroll(0, 0);
  }

  /**
   * Returns true if the current page is the homepage.
   * Is used to render decorative elements on the homepage that should not display on other routes.
   * @returns true if current page is the homepage, false if not.
   */
  isHomePage(): boolean {
    return this.router.isActive('/home', false);
  }
}
