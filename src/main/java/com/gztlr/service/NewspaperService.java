package com.gztlr.service;

import com.gztlr.entity.Newspaper;
import com.gztlr.repository.NewspaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class NewspaperService {

    private final NewspaperRepository newspaperRepository;
    public List<Newspaper> getAllNewspaper() {
        return newspaperRepository.findAll();
    }

    public Newspaper getByIdNewspaper(Long id) {
        return newspaperRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Newspaper not found"));
    }
    public Newspaper addNewspaper(Newspaper newspaper) {
        return newspaperRepository.save(newspaper);
    }
    public Newspaper updateByIdNewspaper(Newspaper newspaper, Long id) {
        Newspaper newNewspaper = newspaperRepository.findById(id).orElse(null);
        if (newNewspaper != null) {
            newNewspaper.setUrl(newspaper.getUrl());
            newNewspaper.setTitle(newspaper.getTitle());
            newspaperRepository.save(newNewspaper);
        }
        return newNewspaper;
    }
    public String deleteById(Long id) {
        newspaperRepository.deleteById(id);
        return "delete by id";
    }
}
