import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GlossaryComponent } from '../../dashboard/main-dashboard/components/glossary/glossary.component';

@NgModule({
  declarations:[
    GlossaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Import the standalone component here
    RouterModule.forChild([
      { path: '', component: GlossaryComponent }
    ])
  ]
})
export class GlossaryModule { }