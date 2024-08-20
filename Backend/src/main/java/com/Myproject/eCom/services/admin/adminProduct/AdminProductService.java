package com.Myproject.eCom.services.admin.adminProduct;

import com.Myproject.eCom.dto.ProductDto;

import java.io.IOException;
import java.util.List;

public interface AdminProductService {
    ProductDto addProduct(ProductDto productDto) throws IOException;

    List<ProductDto> getAllProducts() throws IOException;
}
