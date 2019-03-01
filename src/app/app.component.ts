import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
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

  isHomePage() {
    return this.router.isActive('/home', false);  
  }
}
