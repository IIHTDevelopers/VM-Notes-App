package com.example.notesservice.service;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.notesservice.dto.NotesDto;
import com.example.notesservice.model.Note;
import com.example.notesservice.repo.NoteRepository;

@Service
@Transactional
public class NoteServiceImpl implements NoteService {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private NoteRepository noteRepository;
	
	@Override
	public List<NotesDto> findAll() {
		return this.noteRepository.findAll().stream().map(note -> modelMapper.map(note, NotesDto.class)).collect(Collectors.toList());
	}

	@Override
	public NotesDto findById(Integer id) {
		Note note = this.noteRepository.findById(id).get();
		return modelMapper.map(note, NotesDto.class);
	}
	
	@Override
	public NotesDto addNote(NotesDto noteDto) {
		Note note = new Note();
		BeanUtils.copyProperties(noteDto, note);
		Note createdNote = this.noteRepository.save(note);
		return modelMapper.map(createdNote, NotesDto.class);
	}

	@Override
	public NotesDto deleteNote(Integer id) {
		Note note = this.noteRepository.findById(id).get();
		NotesDto deletedNote = modelMapper.map(note, NotesDto.class);
		this.noteRepository.deleteById(id);
		return deletedNote;
	}

	@Override
	public List<NotesDto> findAllByStatus(String status) {
		return this.noteRepository.findAllByStatus(status).stream().map(note -> modelMapper.map(note, NotesDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<NotesDto> findAllByAuthor(String author) {
		return this.noteRepository.findAllByAuthor(author).stream().map(note -> modelMapper.map(note, NotesDto.class)).collect(Collectors.toList());
	}

	@Override
	public NotesDto updateStatus(Integer id, String status) {
		Note note = this.noteRepository.findById(id).get();
		note.setStatus(status);
		Note createdNote = this.noteRepository.save(note);
		return modelMapper.map(createdNote, NotesDto.class);
	}
	
//	@Override
//	public NotesDto findById(Integer id) {
//		Optional<Note> optionalNote = Optional.of(this.noteRepository.findById(id).orElseThrow(() -> new NoteIdNotFoundException("Id not found")));
//		Note note = optionalNote.get();
//		return modelMapper.map(note, NotesDto.class);
//	}
}
