// import { TestBed, async } from "@angular/core/testing";
// import { RouterTestingModule } from "@angular/router/testing";
// import { AppComponent } from "./app.component";
// import { NotesComponent } from "./notes/notes.component";
// import { HttpClientModule } from "@angular/common/http";

// describe("AppComponent", () => {

//   beforeEach(async(() => {
//       TestBed.configureTestingModule({
//         imports: [RouterTestingModule, HttpClientModule],
//         declarations: [AppComponent, NotesComponent]
//       }).compileComponents();
//     }));

//     describe("boundary", ()=>{

//       it("should create the app component", () => {
//         const fixture = TestBed.createComponent(AppComponent);
//         const app = fixture.componentInstance;
//         expect(app).toBeTruthy();
//       });
//     });
    
//   })

import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { NotesComponent } from "./notes/notes.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [AppComponent, NotesComponent],
    }).compileComponents();
  }));

  describe("boundary", () => {
    it("should create the app component", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  });
  
  // describe("exception", () => {
  //   it("should test me", () => {
  //     expect(true).toBeTruthy();
  //   });
  // });

});
