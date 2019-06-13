import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Output() searchTerm = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  onKey(search) {
    this.searchTerm.emit(search);
  }

}
