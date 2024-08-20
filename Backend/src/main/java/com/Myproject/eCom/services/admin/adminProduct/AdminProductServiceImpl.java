package com.Myproject.eCom.services.admin.adminProduct;

import com.Myproject.eCom.dto.ProductDto;
import com.Myproject.eCom.entity.Category;
import com.Myproject.eCom.entity.Product;
import com.Myproject.eCom.repository.CategoryRepository;
import com.Myproject.eCom.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminProductServiceImpl implements AdminProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductDto addProduct(ProductDto productDto) throws IOException {
        Product product = new Product();
        // Set fields
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setImg(productDto.getBytesImg()); // Ensure byte array is set correctly
        // Handle category setting if necessary
        // Save to repository
        Category category = categoryRepository.findById(productDto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid category ID: " + productDto.getCategoryId()));
             product.setCategory(category);
        Product savedProduct = productRepository.save(product);
        return savedProduct.toDto();
    }





    @Override
    public List<ProductDto> getAllProducts() throws IOException {
        List<Product> products = productRepository.findAll();
        return products.stream().map(Product::toDto).collect(Collectors.toList());
    }
}
