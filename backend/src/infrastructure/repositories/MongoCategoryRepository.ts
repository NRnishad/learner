import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { Category } from "../../domain/entities/Category";
import { CategoryModel } from "../database/models/CategoryModel";

export class MongoCategoryRepository implements ICategoryRepository {
  
  async create(category: Category): Promise<Category> {
    const newCategory = await CategoryModel.create(category);
    return this.mapToEntity(newCategory);
  }

  async findAll(): Promise<Category[]> {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return categories.map(cat => this.mapToEntity(cat));
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await CategoryModel.findOne({ name });
    return category ? this.mapToEntity(category) : null;
  }

  // Helper to keep code clean
  private mapToEntity(doc: any): Category {
    return {
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      isActive: doc.isActive,
      createdAt: doc.createdAt
    };
  }
}