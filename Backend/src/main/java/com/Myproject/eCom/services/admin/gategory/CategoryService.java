package com.Myproject.eCom.services.admin.gategory;

import com.Myproject.eCom.dto.CategoryDto;
import com.Myproject.eCom.entity.Category;
;import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryDto categoryDto);
    List<Category> getAllCategory();
}
