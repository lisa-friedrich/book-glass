import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../service/book-service.service';
import { Book } from '../book';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss']
})
export class DisplayBookComponent implements OnInit {
  selectedbook: Book;
  booklist: any = { rows: [] };
  selectedbookcover: string;
  message: string;
  constructor(private bookService: BookServiceService) { }

  ngOnInit() {
    this.bookService.getBookList().subscribe(data => {
      this.booklist = data;
    });
  }

  displayBook() {
    if (this.booklist.rows.length > 0) {
      const id = Math.floor(Math.random() * this.booklist.rows.length);
      const book = this.booklist.rows[id];
      this.selectedbook = book;
      this.bookService.deleteBook(book.id).subscribe(res => {
        this.booklist.rows.splice(id, 1);
      });
    } else {
      this.message = 'Es befindet sich kein Buch mehr in deinem Glass D:';
    }
  }
}
