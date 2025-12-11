import {Category} from '../entities/Category';

export interface ICategoryRepository {
    create(category: Category): Promise<Category>;
    findAll(): Promise<Category[]>;
    findByName(name: string): Promise<Category | null>;
}