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
  booklist: any = { rows: [] };

  ngOnInit() {
    this.bookService.getBookList().subscribe(data => {
      this.booklist = data;
    });
  }

  resetBookData() {
    this.bookdata = new Book();
  }

  saveBookData() {
    this.message = '';
    if (this.bookdata.title && this.bookdata.author) {
      const double = this.checkDouble(this.bookdata);
      if (!double) {
        this.bookService.getID().subscribe(id => {
          this.bookService.saveBook(this.bookdata, id).subscribe(res => {
            if (res) {
              this.resetBookData();
              this.message = 'Das Buch wurde deiner Liste hinzugefügt';
            }
          });
        });
      } else {
        this.message = 'Es existiert bereits ein Buch mit diesem Titel und Autor in deiner Liste';
      }
    } else {
      this.message = 'Das Feld für Buchtitel und Author müssen ausgefüllt werden';
    }
  }

  checkDouble(bookdata) {
    let double = false;
    for (const book of this.booklist.rows) {
      (book.doc.title === bookdata.title && book.doc.author === bookdata.author) && (double = true);
    }
    return double;
  }
}

