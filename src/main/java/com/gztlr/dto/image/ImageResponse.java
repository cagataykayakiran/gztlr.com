package com.gztlr.dto.image;

import com.gztlr.entity.ImageData;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class ImageResponse {

    private List<ImageData> data;
}
