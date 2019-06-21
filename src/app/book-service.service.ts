import { Injectable } from '@angular/core';
import { Book } from './book';
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
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  returnBookList() {
    if (!this.booklist) {
      this.getBookList().subscribe(data => {
        this.booklist = data;
        return this.booklist;
      });
    } else {
      return this.booklist;
    }
  }

  saveBook(bookdata) {
    //get id with http://127.0.0.1:5984/_uuids
    //http put http://127.0.0.1:5984/books/id
    let pass = true;
    const key = 'book' + this.makeRandom();
    for (const book of this.booklist.rows) {
      // tslint:disable-next-line: no-unused-expression
      (book.doc.title === bookdata.title && book.doc.author === bookdata.author) && (pass = false);
    }

    if (pass) {
      bookdata.id = key;
      //  this.booklist.push(bookdata);
      // localStorage.setItem('booklist', JSON.stringify(this.booklist));

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
    return this.http.get(this._dbURL + 'books/_all_docs?include_docs=true', this.httpOptions).pipe(map(data => {
      this.booklist = data;
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
