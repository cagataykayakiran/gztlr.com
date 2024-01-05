package com.gztlr.repository;

import com.gztlr.entity.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ImageRepository extends JpaRepository<ImageData, Long> {

    ImageData findByName(String fileName);
}
