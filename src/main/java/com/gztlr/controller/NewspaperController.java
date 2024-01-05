package com.gztlr.controller;

import com.gztlr.entity.Newspaper;
import com.gztlr.service.NewspaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/newspaper")
@RequiredArgsConstructor
public class NewspaperController {

    private final NewspaperService newspaperService;

    @GetMapping()
    public List<Newspaper> getAllNewspaper() {
        return newspaperService.getAllNewspaper();
    }

    @GetMapping("{id}")
    public Newspaper getByIdNewspaper(@PathVariable Long id) {
        return newspaperService.getByIdNewspaper(id);
    }

    @PostMapping("/add")
    public Newspaper addNewspaper(@RequestBody Newspaper newspaper) {
        return newspaperService.addNewspaper(newspaper);
    }

    @PatchMapping("{id}")
    public Newspaper updateByIdNewspaper(@RequestBody Newspaper newspaper, @PathVariable Long id) {
        return newspaperService.updateByIdNewspaper(newspaper, id);
    }
    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id) {
        return newspaperService.deleteById(id);
    }
}
