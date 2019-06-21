import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { Book } from '../book';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss']
})
export class DisplayBookComponent implements OnInit {
  selected: any;
  selectedbook: Book;
  selectedbookcover: string;
  constructor(private bookService: BookServiceService) { }

  ngOnInit() {
  }

  displayBook() {
    this.selected = this.bookService.getBook();
    this.selectedbook = this.selected[0];
    this.selectedbookcover = this.selected[1];
    console.info(this.selected);
  }

}
