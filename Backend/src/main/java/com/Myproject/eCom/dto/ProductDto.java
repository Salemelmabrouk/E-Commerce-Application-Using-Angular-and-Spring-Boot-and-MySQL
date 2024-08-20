package com.Myproject.eCom.dto;

import lombok.Data;

@Data
public class ProductDto {
        private long id;
        private String name;
        private long price;
        private String description;
        private long categoryId;
        private byte[] bytesImg; // To hold image data as bytes
}
