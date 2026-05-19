import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Item } from '../entities/Item';

export class ItemRepository {
  private repository: Repository<Item>;

  constructor() {
    this.repository = AppDataSource.getRepository(Item);
  }

  async findAll(page: number, limit: number, search?: string): Promise<[Item[], number]> {
    const query = this.repository.createQueryBuilder('item')
      .leftJoinAndSelect('item.plataforma', 'plataforma')
      .orderBy('item.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      query.where('LOWER(item.nomeItem) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    return query.getManyAndCount();
  }

  async findById(id: string): Promise<Item | null> {
    return this.repository.findOne({
      where: { id },
      relations: { plataforma: true, images: true },
    });
  }

  async findByPlataforma(idPlataforma: string): Promise<Item[]> {
    return this.repository.find({
      where: { idPlataforma },
      relations: { images: true },
      order: { createdAt: 'DESC' },
    });
  }

  async create(data: Partial<Item>): Promise<Item> {
    const item = this.repository.create(data);
    return this.repository.save(item);
  }

  async update(id: string, data: Partial<Item>): Promise<Item | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }
}