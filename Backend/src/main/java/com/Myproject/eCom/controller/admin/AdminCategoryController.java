package com.Myproject.eCom.controller.admin;

import com.Myproject.eCom.dto.CategoryDto;
import com.Myproject.eCom.entity.Category;
import com.Myproject.eCom.services.admin.gategory.CategoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminCategoryController {
    private  final CategoryService categoryService;

@PostMapping("category")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDto categoryDto) {
    Category category =categoryService.createCategory(categoryDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(category);
}

@GetMapping("")
    public ResponseEntity<List<Category>> getAllCategories() {
return  ResponseEntity.ok( categoryService.getAllCategory() );

}

}
