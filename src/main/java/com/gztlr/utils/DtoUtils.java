package com.gztlr.utils;

import com.gztlr.dto.DtoEntity;
import org.modelmapper.ModelMapper;

public class DtoUtils {
    public DtoEntity convertToDto(Object obj, DtoEntity mapper) {
        return new ModelMapper().map(obj, mapper.getClass());
    }
    public Object convertToEntity(Object obj, DtoEntity mapper) {
        return new ModelMapper().map(mapper, obj.getClass());
    }
}
