import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../service/book-service.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {
  objectKeys = Object.keys;
  booklist: any;
  searchText: string;
  constructor(private bookservice: BookServiceService) { }

  ngOnInit() {
    this.bookservice.getBookList().subscribe(data => {
      this.booklist = data;
    });
  }

  deleteBook(index) {
    this.bookservice.deleteBook(index);
    this.ngOnInit();
  }

  searchBook(searchtext) {
    this.searchText = searchtext;
  }

}
