import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';
import { HttpClientModule } from '@angular/common/http';

describe('NotesComponent', () => {
  let serviceMock: any;
  let formBuilderMock: FormBuilder;
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotesComponent],
      providers: [FormBuilder, NotesService],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceMock = {
      getNotes: jest.fn(),
      postNotes: jest.fn(),
      patchNotes: jest.fn(),
      deleteNotes: jest.fn(),
    };

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("boundary", ()=>{

    it('should create notes component', () => {
      expect(component).toBeTruthy();
      expect(component).toBeDefined();
    });

    
    // describe('Testing create component and declarations', () => {
      it('should create the notes component', () => {
        const fixt = new NotesComponent(formBuilderMock, serviceMock);
        expect(fixt).toBeTruthy();
      });
      
      it('should declare obj refereces', () => {
        expect(component.modelObj).toBeDefined();
        expect(component.formValues).toBeDefined();
      });
    // });
  // })

  // describe('Test:ngOnInit', () => {
    it('Initialize the form', () => {
      const formValues = {
        title: '',
        author: '',
        description: '',
        status: '',
      };
      expect(component.formValues.value).toEqual(formValues);
    });
  });

  describe('exception', () => {
    // describe('Test:Form', () => {
      it('should invalidate the form when empty', () => {
      component.formValues.controls['title'].setValue('');
      component.formValues.controls['author'].setValue('');
      component.formValues.controls['description'].setValue('');
      component.formValues.controls['status'].setValue('');
      expect(component.formValues.valid).toBeFalsy();
    });

    it('should validate the form ', () => {
      component.formValues.controls['title'].setValue('title1');
      component.formValues.controls['author'].setValue('author1');
      component.formValues.controls['description'].setValue('description1');
      component.formValues.controls['status'].setValue('status1');
      expect(component.formValues.valid).toBeTruthy();
    });

    it('title field validity', () => {
      const title = component.formValues.controls['title'];
      expect(title.valid).toBeFalsy();
      title.setValue('');
      expect(title.hasError('required')).toBeTruthy();
    });

    it('description field validity', () => {
      const description = component.formValues.controls['description'];
      expect(description.valid).toBeFalsy();
      description.setValue('');
      expect(description.hasError('required')).toBeTruthy();
    });

    it('status field validity', () => {
      const status = component.formValues.controls['status'];
      expect(status.valid).toBeFalsy();
      status.setValue('');
      expect(status.hasError('required')).toBeTruthy();
    });
  });

  describe('business', () => {
    // describe('Test:methods declarations of notes component', () => {
      
    it('clickAddNote method to be defined', () => {
      component.clickAddNote = jest.fn();
      expect(component.clickAddNote).toBeDefined();
    });

    it('postNoteData method to be defined', () => {
      component.postNoteData = jest.fn();
      expect(component.postNoteData).toBeDefined();
    });

    it('getAllNotesData method to be defined', () => {
      component.getAllNotesData = jest.fn();
      expect(component.getAllNotesData).toBeDefined();
    });

    it('deleteNote method to be defined', () => {
      component.deleteNote = jest.fn();
      expect(component.deleteNote).toBeDefined();
    });

    it('noteEdit method to be defined', () => {
      component.noteEdit = jest.fn();
      expect(component.noteEdit).toBeDefined();
    });
    it('updateNoteData method to be defined', () => {
      component.updateNoteData = jest.fn();
      expect(component.updateNoteData).toBeDefined();
    });
  });

});
