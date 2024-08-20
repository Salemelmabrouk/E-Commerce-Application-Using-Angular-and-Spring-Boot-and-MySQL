package com.Myproject.eCom.services.admin.gategory;

import com.Myproject.eCom.dto.CategoryDto;
import com.Myproject.eCom.entity.Category;
import com.Myproject.eCom.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class categoryServiceImpl implements CategoryService {

    private  final CategoryRepository categoryRepository;

    public Category createCategory(CategoryDto categoryDto) {

       Category category = new Category();
       category.setName(categoryDto.getName());
       category.setDescription(categoryDto.getDescription());
       return categoryRepository.save(category);

    }
public List<Category> getAllCategory() {

        return categoryRepository.findAll();
}


}
