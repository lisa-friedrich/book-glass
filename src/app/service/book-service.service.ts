import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

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

  saveBook(bookdata, id) {
    bookdata = JSON.parse(JSON.stringify(bookdata));
    return this.http.put(this._dbURL + 'books/' + id, bookdata).pipe(map(res => {
      return res['ok'];
    }));
  }

  getID() {
    return this.http.get(this._dbURL + '_uuids').pipe(map(id => {
      return id['uuids'];
    }));
  }

  getBookList() {
    return this.http.get(this._dbURL + 'books/_all_docs?include_docs=true').pipe(map(books => {
      this.booklist = books;
      return this.booklist;
    }));
  }

  getBookCover(isbn) {
    isbn = isbn.replace(/-/g, '');
    const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;

    return this.http.get(url);
  }

  deleteBook(id) {
    const book = this.booklist.rows.find(i => i.id === id);
    return this.http.delete(this._dbURL + 'books/' + id + '?rev=' + book.doc._rev).pipe(map(res => {
      return res;
    }));
  }
}
