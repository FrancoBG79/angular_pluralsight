import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppLogoComponent } from './app-logo.component';
import { AboutNavIconComponent, CoursesNavIconComponent, HamburgerIconComponent, UserNavIconComponent } from './app-nav-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app-signal-forms.component.html',
  styleUrls: ['./app-signal-forms.component.css'],
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AppLogoComponent, CoursesNavIconComponent, AboutNavIconComponent, UserNavIconComponent, HamburgerIconComponent]
})
export class AppComponent {
  navOpen = signal(false);
}
