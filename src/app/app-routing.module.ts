import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DisplayBookComponent } from './display-book/display-book.component';
import { BooklistComponent } from './booklist/booklist.component';
import { AddBookFormularComponent } from './add-book-formular/add-book-formular.component';

const routes = [
  { path: 'dash', component: DisplayBookComponent },
  { path: 'booklist', component: BooklistComponent },
  { path: 'bookform', component: AddBookFormularComponent },
  { path: '', redirectTo: 'dash', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
