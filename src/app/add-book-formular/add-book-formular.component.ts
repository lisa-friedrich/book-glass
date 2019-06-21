import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../service/book-service.service';
import { Book } from '../book';

@Component({
  selector: 'app-add-book-formular',
  templateUrl: './add-book-formular.component.html',
  styleUrls: ['./add-book-formular.component.scss']
})
export class AddBookFormularComponent implements OnInit {
  constructor(private bookService: BookServiceService) { }
  bookdata = new Book();
  message: string;
  ngOnInit() {
  }

  resetBookData() {
    this.bookdata = new Book();
  }

  saveBookData() {
    this.message = '';
    if (this.bookdata.title && this.bookdata.author) {
      const response = this.bookService.saveBook(this.bookdata);
      if (response) {
        this.resetBookData();
        this.message = 'Das Buch wurde deiner Liste hinzugefügt';
      } else {
        this.message = 'Es existiert bereits ein Buch mit diesem Titel und Autor in deiner Liste';
      }
    } else {
      this.message = 'Das Feld für Buchtitel und Author müssen ausgefüllt werden';
    }
  }
}

