import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-jobPost.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
