import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BooklistComponent } from './booklist/booklist.component';
import { AddBookFormularComponent } from './add-book-formular/add-book-formular.component';
import { DisplayBookComponent } from './display-book/display-book.component';
import { SearchbarComponent } from './booklist/searchbar/searchbar.component';
import { BookFilterPipe } from './filter-pipe/book-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BooklistComponent,
    AddBookFormularComponent,
    DisplayBookComponent,
    SearchbarComponent,
    BookFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
