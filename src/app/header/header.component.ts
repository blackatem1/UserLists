import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm: string = '';
  
  // @Output() searchEvent = new EventEmitter<string>();
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  onSearchChange(searchValue: string): void {
    this.searchChange.emit(searchValue);
  }
  
}
