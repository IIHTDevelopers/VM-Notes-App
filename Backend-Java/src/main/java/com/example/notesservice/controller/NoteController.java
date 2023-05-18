package com.example.notesservice.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.notesservice.dto.NotesDto;
import com.example.notesservice.exception.ErrorResponse;
import com.example.notesservice.exception.InvalidNoteDataException;
import com.example.notesservice.service.NoteService;

@CrossOrigin
@RestController
@RequestMapping("/noteservice")
public class NoteController {
	
	@Autowired
	private NoteService noteService;

	@GetMapping("/all")
	public ResponseEntity<List<NotesDto>> findAll(){
		return new ResponseEntity<List<NotesDto>>(this.noteService.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/add")
//	public ResponseEntity<NotesDto> addNote(@Valid @RequestBody NotesDto note, BindingResult result){
	public ResponseEntity<NotesDto> addNote(@Valid @RequestBody NotesDto note){
		return new ResponseEntity<NotesDto>(this.noteService.addNote(note), HttpStatus.OK);
    }
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteNote(@PathVariable("id") Integer id){
		try {
			return new ResponseEntity<NotesDto>(this.noteService.deleteNote(id), HttpStatus.OK);
		} catch(Exception ex) {
			ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage("Note with Id - " + id + " not found!");
			return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Integer id){
		try {
			return new ResponseEntity<NotesDto>(this.noteService.findById(id), HttpStatus.OK);
		} catch(Exception ex) {
			ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage("Note with Id - " + id + " not found!");
			return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/update/{id}/{status}")
	public ResponseEntity<?> updateStatus(@PathVariable("id") Integer id, @PathVariable("status") String status){ 
		try {
			if(!status.matches("^(completed|pending)$")) {
				throw new InvalidNoteDataException("Status must be either completed or pending");
			}
			return new ResponseEntity<NotesDto>(this.noteService.updateStatus(id, status), HttpStatus.OK);
		} catch(InvalidNoteDataException ex) {
			ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage(ex.getMessage());
			return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
		} catch(Exception ex) {
			ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage("Note with Id - " + id + " not found!");
			return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/findByAuthor/{author}")
	public ResponseEntity<?> findAllByAuthor(@PathVariable("author") String author){
		try {
			return new ResponseEntity<List<NotesDto>>(this.noteService.findAllByAuthor(author), HttpStatus.OK);
		} catch(Exception ex) {
			ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage("Author not found");
			return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/findbyStatus/{status}")
	public ResponseEntity<List<NotesDto>> findAllByStatus(@PathVariable("status") String status){
		return new ResponseEntity<List<NotesDto>>(this.noteService.findAllByStatus(status), HttpStatus.OK);
	}
}











