import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mission-value',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './mission-value.component.html',
  styleUrl: './mission-value.component.scss'
})
export class MissionValueComponent {

}
