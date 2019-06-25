import { Injectable } from '@angular/core';
import { Book } from '../book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  booklist: any;
  private _dbURL = 'http://localhost:5984/';
  constructor(private http: HttpClient) { }

  private httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  saveBook(bookdata) {
    let pass = true;
    const key = 'book' + this.makeRandom();
    for (const book of this.booklist.rows) {
      // tslint:disable-next-line: no-unused-expression
      (book.doc.title === bookdata.title && book.doc.author === bookdata.author) && (pass = false);
    }

    if (pass) {
      bookdata.id = key;
      //this.booklist.push(bookdata);
      //localStorage.setItem('booklist', JSON.stringify(this.booklist));

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
    console.info('get books');
    return this.http.get(this._dbURL + 'books/_all_docs?include_docs=true').pipe(map(books => {
      console.log(books);
      this.booklist = books;
      return this.booklist;
    }));
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

    return this.http.get(url);
  }

  deleteBook(id) {
    // this.booklist.splice(this.booklist.findIndex(x => x.id === id), 1);
    console.log(id);
    console.log(this.booklist);
    // localStorage.setItem('booklist', JSON.stringify(this.booklist));
    return this.booklist;
  }
}
