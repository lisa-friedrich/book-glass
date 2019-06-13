import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() selectedview = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  changeView(selected) {
    this.selectedview.emit(selected);
  };
}
