package com.example.notesservice.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.notesservice.model.Note;

public interface NoteRepository extends JpaRepository<Note, Integer>{
	List<Note> findAllByStatus(String status);
	List<Note> findAllByAuthor(String author);
}
