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
import { CreateUpdateConfirmComponent } from './posts/create-update-confirm/create-update-confirm.component';
import { PostModalComponent } from './components/post-modal/post-modal.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ListModalComponent } from './components/list-modal/list-modal.component';
import { UserCreateConfirmComponent } from './users/user-create-confirm/user-create-confirm.component';
import { UploadCsvComponent } from './posts/upload-csv/upload-csv.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsListComponent,
    PlainmodalComponent,
    CreateUpdateConfirmComponent,
    PostModalComponent,
    UsersListComponent,
    ListModalComponent,
    UserCreateConfirmComponent,
    UploadCsvComponent,
    UserProfileComponent,
    EditProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
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
