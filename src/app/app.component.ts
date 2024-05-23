import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Make sure selector is 'app-root'
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // standalone: true // Add standalone flag
})
export class AppComponent {
  title="sad";
  searchTerm: string = '';

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
  }}
