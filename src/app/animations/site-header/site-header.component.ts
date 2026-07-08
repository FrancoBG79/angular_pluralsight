import { Component } from '@angular/core';
import {
    RouterLinkActive,
    RouterLink,
  } from '@angular/router';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
  imports: [
    RouterLinkActive,
    RouterLink, 
  ]
})
export class SiteHeaderComponent {
  constructor() {}
}
