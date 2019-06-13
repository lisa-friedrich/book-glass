import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  booklist: any;
  constructor(private http: HttpClient) { }

  saveBook(bookdata) {
    let pass = true;
    const key = 'book' + this.makeRandom();
    for (const book of this.booklist) {
      // tslint:disable-next-line: no-unused-expression
      (book.title === bookdata.title && book.author === bookdata.author) && (pass = false);
    }

    if (pass) {
      bookdata.id = key;
      this.booklist.push(bookdata);
      localStorage.setItem('booklist', JSON.stringify(this.booklist));

      return true;
    } else {
      return false;
    }
  }

  makeRandom() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890[]';
    const lengthOfCode = 20;
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }


  getBookList() {
    this.booklist = JSON.parse(localStorage.getItem('booklist'));
    // tslint:disable-next-line: no-unused-expression
    (this.booklist === null) && localStorage.setItem('booklist', '[]');

    return this.booklist;
  }

  getBook() {
    const id: number = Math.floor(Math.random() * this.booklist.length);
    const book = this.booklist[id];
    let cover = '';
    // this.deleteBook(id);
    if (this.booklist[id].isbn) {
      const isbn = this.booklist[id].isbn.replace(/-/g, '');
      cover = 'http://covers.openlibrary.org/b/isbn/' + isbn + '-M.jpg';
    }
    return [book, cover];
  }

  getBookCover(isbn) {
    isbn = isbn.replace(/-/g, '');
    const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
    // tslint:disable-next-line: no-console
    console.info(url);
    return this.http.get(url);
  }

  deleteBook(id) {
    this.booklist.splice(this.booklist.findIndex(x => x.id === id), 1);
    localStorage.setItem('booklist', JSON.stringify(this.booklist));
    return this.booklist;
  }
}
