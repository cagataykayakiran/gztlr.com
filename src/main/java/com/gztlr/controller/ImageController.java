package com.gztlr.controller;


import com.gztlr.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService service;

/*    @PostMapping("/download")
    public String downloadAndSaveImage(@RequestBody ImageRequest imageRequest) {
        String localImagePath = service.saveImageFromUrl(imageRequest.getImageUrl());
        if (localImagePath != null) {
            return "Resim başarıyla indirilip kaydedildi. Yolu: " + localImagePath;
        } else {
            return "Resim indirme ve kaydetme sırasında bir hata oluştu.";
        }
    }*/

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("images") MultipartFile file,
                                         @RequestParam("folder") Optional<String> folder) throws IOException {
        return ResponseEntity
                .status(HttpStatusCode.valueOf(200))
                .body(service.uploadImage(file, folder));
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> getImage(@PathVariable String fileName) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG) // Resim türüne göre uygun content type belirleyin
                .body(service.findByName(fileName));
    }

    @DeleteMapping({"{id}"})
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        return ResponseEntity.ok()
                .body(service.deleteById(id));
    }
}
