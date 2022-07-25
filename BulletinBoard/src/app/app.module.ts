import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from './angularmaterials.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './users/login/login.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PlainmodalComponent } from './components/plainmodal/plainmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsListComponent,
    PlainmodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularmaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
