package com.gztlr.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class Newspaper {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String url;
/*    @OneToMany
    @JoinColumn(name = "image_data_id")
    private List<ImageData> image;*/
}
