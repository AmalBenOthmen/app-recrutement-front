import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-browse-job',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './browse-job.component.html',
  styleUrls: ['./browse-job.component.scss']
})
export class BrowseJobComponent { }
