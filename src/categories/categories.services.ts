import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
  async getAllCategories() {
    const categories = await this.categoriesRepository.find();
    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async getCategoryById(id: string) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }
  async createCategory(categoryData: Partial<Category>) {
    const newCategory = this.categoriesRepository.create(categoryData);
    if (!newCategory.type || !newCategory.name) {
      throw new NotFoundException(
        'Type and name are required to create a category',
      );
    }
    return await this.categoriesRepository.save(newCategory);
  }
  async updateCategory(id: string, categoryData: Partial<Category>) {
    try {
      const category = await this.getCategoryById(id);
      if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      if (!categoryData) {
        throw new NotFoundException('No data provided for update');
      }
      return await this.categoriesRepository.update(id, categoryData);
    } catch (error) {
      throw new HttpException(
        `Error updating category with id ${id}: ${error.message}`,
        500,
      );
    }
  }
  async deleteCategory(id: string) {
    const category = await this.getCategoryById(id);
    return await this.categoriesRepository.remove(category);
  }
}
