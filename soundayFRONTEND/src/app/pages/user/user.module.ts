import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';


@NgModule({
  declarations: [
    UserComponent,
    EditProfileModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,FormsModule
  ]
})
export class UserModule { }
