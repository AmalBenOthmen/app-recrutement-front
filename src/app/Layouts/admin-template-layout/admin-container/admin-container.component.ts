import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ProfileService } from '../../../services/services/profile.service';
import { NoteService, Note } from '../../../services/services/noteService';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {
  userCount: number | undefined;
  appointmentForm!: FormGroup;
  notes: Note[] = [];
  newNote: Note = { id: 0, content: '' };
  errorMessage: string = '';

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.loadUserCount();
    this.initializeForm();
    this.loadNotes();  // Load notes when the component initializes
  }

  loadUserCount(): void {
    this.profileService.getUserCount().subscribe(
      count => {
        this.userCount = count;
      },
      error => {
        console.error('Error loading user count', error);
      }
    );
  }

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      appointmentTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  scheduleMeeting() {
    let appointmentTime = new Date(this.appointmentForm.value.appointmentTime);
    const startTime = appointmentTime.toISOString().slice(0, 18) + '-07:00';
    const endTime = this.getEndTime(appointmentTime);
    const eventDetails = {
      email: this.appointmentForm.value.email,
      startTime: startTime,
      endTime: endTime,
    };
    console.info(eventDetails);
    this.redirectToGoogleCalendar(eventDetails);
  }

  getEndTime(appointmentTime: Date) {
    appointmentTime.setHours(appointmentTime.getHours() + 1);
    const endTime = appointmentTime.toISOString().slice(0, 18) + '-07:00';
    return endTime;
  }

  redirectToGoogleCalendar(eventDetails: { email: string, startTime: string, endTime: string }) {
    const baseUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';
    const startDateTime = eventDetails.startTime.replace(/-|:|\.\d\d\d/g, '');
    const endDateTime = eventDetails.endTime.replace(/-|:|\.\d\d\d/g, '');
    const params = new URLSearchParams({
      dates: `${startDateTime}/${endDateTime}`,
      text: 'Scheduled Meeting',
      location: 'Online',
      details: 'This is a scheduled meeting.',
      add: eventDetails.email,
    });

    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, '_blank');
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(
      notes => {
        this.notes = notes;
      },
      error => {
        console.error('Error loading notes', error);
      }
    );
  }

  saveNote() {
    this.noteService.addNote(this.newNote).subscribe(
      (response) => {
        console.log('Note saved successfully', response);
        this.notes.push(response); // Add the new note to the list
        this.newNote = { id: 0, content: '' }; // Reset the new note
      },
      (error) => {
        console.error('Error saving note', error);
        this.errorMessage = 'Error saving note. Please try again later.';
      }
    );
  }

  deleteNote(index: number): void {
    const noteId = this.notes[index].id;
    if (noteId) {
      this.noteService.deleteNote(noteId).subscribe(
        () => {
          this.notes.splice(index, 1);
        },
        error => {
          console.error('Error deleting note', error);
        }
      );
    } else {
      this.notes.splice(index, 1);
    }
  }

  updateNoteContent(index: number, content: string | null): void {
    const noteContent = content || ''; // Handle null by defaulting to an empty string
    if (this.notes[index].content !== noteContent) {
      this.notes[index].content = noteContent;
      const note = this.notes[index];
      this.noteService.updateNote(note).subscribe(
        () => {
          console.info('Note updated successfully');
        },
        error => {
          console.error('Error updating note', error);
        }
      );
    }
  }
}
