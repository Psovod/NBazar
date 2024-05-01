import { Component } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './shared/auth/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public loaderActive = true;
  constructor(private router: Router, private auth: AuthService) {
    this.auth.checkLocalStorage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderActive = true;
      }
      if (event instanceof GuardsCheckStart) {
        this.loaderActive = false;
      }

      if (event instanceof GuardsCheckEnd) {
        this.loaderActive = false;
      }
      if (event instanceof NavigationEnd) {
        this.loaderActive = false;
      }

      if (event instanceof NavigationError) {
        this.loaderActive = false;
      }
    });
  }
}
