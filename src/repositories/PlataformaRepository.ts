import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Plataforma } from '../entities/Plataforma';

export class PlataformaRepository {
  private repository: Repository<Plataforma>;

  constructor() {
    this.repository = AppDataSource.getRepository(Plataforma);
  }

  async findAll(): Promise<Plataforma[]> {
    return this.repository.find({
      relations: { items: true },
      order: { nomePlataforma: 'ASC' },
    });
  }

  async findById(id: string): Promise<Plataforma | null> {
    return this.repository.findOne({
      where: { id },
      relations: { items: true },
    });
  }

  async findByNome(nomePlataforma: string): Promise<Plataforma | null> {
    return this.repository.findOne({ where: { nomePlataforma } });
  }

  async create(data: Partial<Plataforma>): Promise<Plataforma> {
    const plataforma = this.repository.create(data);
    return this.repository.save(plataforma);
  }

  async update(id: string, data: Partial<Plataforma>): Promise<Plataforma | null> {
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