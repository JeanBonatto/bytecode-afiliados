import { ItemRepository } from '../repositories/ItemRepository';
import { PlataformaRepository } from '../repositories/PlataformaRepository';
import { Item } from '../entities/Item';
import { CreateItemDTO, UpdateItemDTO, PaginationQueryDTO } from '../dtos/ItemDTO';

export interface PaginatedItems {
  data: Item[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ItemService {
  private itemRepository: ItemRepository;
  private plataformaRepository: PlataformaRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
    this.plataformaRepository = new PlataformaRepository();
  }

  async listAll(query: PaginationQueryDTO): Promise<PaginatedItems> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [data, total] = await this.itemRepository.findAll(page, limit, query.search);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string): Promise<Item> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new Error('Item não encontrado');
    }

    return item;
  }

  async getByPlataforma(idPlataforma: string): Promise<Item[]> {
    const plataformaExists = await this.plataformaRepository.exists(idPlataforma);

    if (!plataformaExists) {
      throw new Error('Plataforma não encontrada');
    }

    return this.itemRepository.findByPlataforma(idPlataforma);
  }

  async create(dto: CreateItemDTO): Promise<Item> {
    const plataformaExists = await this.plataformaRepository.exists(dto.idPlataforma);

    if (!plataformaExists) {
      throw new Error('Plataforma não encontrada');
    }

    return this.itemRepository.create(dto);
  }

  async update(id: string, dto: UpdateItemDTO): Promise<Item> {
    const exists = await this.itemRepository.exists(id);

    if (!exists) {
      throw new Error('Item não encontrado');
    }

    if (dto.idPlataforma) {
      const plataformaExists = await this.plataformaRepository.exists(dto.idPlataforma);
      if (!plataformaExists) {
        throw new Error('Plataforma não encontrada');
      }
    }

    const updated = await this.itemRepository.update(id, dto);

    if (!updated) {
      throw new Error('Erro ao atualizar item');
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    const exists = await this.itemRepository.exists(id);

    if (!exists) {
      throw new Error('Item não encontrado');
    }

    await this.itemRepository.delete(id);
  }
}