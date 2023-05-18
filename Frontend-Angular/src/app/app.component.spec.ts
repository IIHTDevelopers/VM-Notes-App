import {
  ComponentFixture,
  TestBed,
  TestBedStatic,
  async,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBedInitializer } from './init';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let h1: HTMLElement;
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       RouterTestingModule,
  //       FormsModule,
  //       ReactiveFormsModule,
  //       HttpClientTestingModule,
  //     ],
  //     declarations: [AppComponent, NotesComponent],
  //   }).compileComponents();
  // }));
  let TestBed: TestBedStatic;

  beforeAll(() => {
    TestBed = new TestBedInitializer().getTestBed();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [AppComponent, NotesComponent],
    });
  });

  describe('boundary', () => {
    it('should create the app component', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  });
});
