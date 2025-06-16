import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.services';
import { Response } from 'express';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.getAllCategories();
      return res.status(200).json({
        success: true,
        data: categories,
        message: 'Categories retrieved successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'An error occurred while retrieving categories',
        error: error.message,
      });
    }
  }
  @Get(':id')
  async getCategoryById(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const category = await this.categoriesService.getCategoryById(id);
      return res.status(200).json({
        success: true,
        data: category,
        message: 'Category retrieved successfully',
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: `Category with id ${id} not found`,
        error: error.message,
      });
    }
  }
  @Post()
  async createCategory(
    @Res() res: Response,
    @Body() categoryData: Partial<Category>,
  ) {
    try {
      const newCategory =
        await this.categoriesService.createCategory(categoryData);
      return res.status(201).json({
        success: true,
        data: newCategory,
        message: 'Category created successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'An error occurred while creating the category',
        error: error.message,
      });
    }
  }
  @Patch(':id')
  async updateCategory(
    @Res() res: Response,
    @Body() categoryData: Partial<Category>,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const updatedCategory = await this.categoriesService.updateCategory(
        id,
        categoryData,
      );
      return res.status(200).json({
        success: true,
        data: updatedCategory,
        message: 'Category updated successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `An error occurred while updating the category with id ${id}`,
        error: error.message,
      });
    }
  }
  @Delete(':id')
  async deleteCategory(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const deletedCategory = await this.categoriesService.deleteCategory(id);
      return res.status(200).json({
        success: true,
        data: deletedCategory,
        message: 'Category deleted successfully',
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: `Category with id ${id} not found`,
        error: error.message,
      });
    }
  }
}
