import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddBookFormularComponent } from './add-book-formular/add-book-formular.component';
import { BooklistComponent } from './booklist/booklist.component';
import { DisplayBookComponent } from './display-book/display-book.component';
import { MenuComponent } from './menu/menu.component';
import { BookFilterPipe } from './book-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddBookFormularComponent,
    BooklistComponent,
    DisplayBookComponent,
    MenuComponent,
    BookFilterPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
