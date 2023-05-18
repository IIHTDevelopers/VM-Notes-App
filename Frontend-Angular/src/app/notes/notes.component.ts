import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../notes.service';
import { NotesModel } from './notes.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  formValues!: FormGroup;
  modelObj: NotesModel = new NotesModel();
  allNotesData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  isUpdate: boolean = false;
  constructor(private fB: FormBuilder, private api: NotesService) {}

  ngOnInit(): void {
    this.formValues = this.fB.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getAllNotesData();
  }

  get title() {
    return this.formValues.get('title');
  }
  get author() {
    return this.formValues.get('author');
  }
  get description() {
    return this.formValues.get('description');
  }
  get status() {
    return this.formValues.get('status');
  }

  //calls when you click on Add Employee button
  clickAddNote() {
    this.isUpdate = false;
    this.formValues.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  //Save Data
  postNoteData() {
    this.modelObj.title = this.formValues.value.title;
    this.modelObj.author = this.formValues.value.author;
    this.modelObj.description = this.formValues.value.description;
    this.modelObj.status = this.formValues.value.status;
    this.api.postNotes(this.modelObj).subscribe(
      (res) => {
        alert('Notes Saved Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValues.reset();
        this.getAllNotesData();
      },
      (err) => {
        if (err.status === 400) {
          alert(JSON.stringify(err.error));
        }
      }
    );
  }

  //Get data
  getAllNotesData() {
    this.api.getNotes().subscribe((res) => {
      let unsortedNotes = [];
      unsortedNotes = res;
      unsortedNotes.sort(
        (a: { id: number }, b: { id: number }) => Number(a.id) - Number(b.id)
      );
      this.allNotesData = unsortedNotes;
    });
  }

  //Delete data
  deleteNote(emp: any) {
    this.api.deleteNotes(emp.id).subscribe((res) => {
      alert('Notes Deleted Successfully');
      this.getAllNotesData();
    });
  }

  // set values of specfid emp to html form fields to edit
  noteEdit(note: any) {
    this.isUpdate = true;
    this.showAdd = false;
    this.showUpdate = true;
    this.modelObj.id = note.id;
    this.formValues.controls['title'].setValue(note.title);
    this.formValues.controls['author'].setValue(note.author);
    this.formValues.controls['description'].setValue(note.description);
    this.formValues.controls['status'].setValue(note.status);
  }

  //Update data
  updateNoteData() {
    this.modelObj.title = this.formValues.value.title;
    this.modelObj.author = this.formValues.value.author;
    this.modelObj.description = this.formValues.value.description;
    this.modelObj.status = this.formValues.value.status;

    this.api.updateNote(this.modelObj.id, this.modelObj.status).subscribe(
      (res) => {
        alert('Notes Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValues.reset();
        this.getAllNotesData();
      },
      (err) => {
        if (err.status === 400) {
          alert(JSON.stringify(err.error));
        }
      }
    );
  }
}
