import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ItemService } from '../services/ItemService';
import { CreateItemDTO, UpdateItemDTO, PaginationQueryDTO } from '../dtos/ItemDTO';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  listAll = async (req: Request, res: Response): Promise<void> => {
    // ... (sem alteração)
  };

  getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const item = await this.itemService.getById(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno';
      res.status(message.includes('não encontrado') ? 404 : 500).json({ error: message });
    }
  };

  getByPlataforma = async (req: Request<{ idPlataforma: string }>, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.getByPlataforma(req.params.idPlataforma);
      res.status(200).json(items);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno';
      res.status(message.includes('não encontrada') ? 404 : 500).json({ error: message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    // ... (sem alteração)
  };

  update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const dto = plainToClass(UpdateItemDTO, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          error: 'Dados inválidos',
          details: errors.map(e => ({
            field: e.property,
            errors: Object.values(e.constraints ?? {}),
          })),
        });
        return;
      }

      const item = await this.itemService.update(req.params.id, dto);
      res.status(200).json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno';
      const status = message.includes('não encontrad') ? 404 : 500;
      res.status(status).json({ error: message });
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      await this.itemService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno';
      res.status(message.includes('não encontrado') ? 404 : 500).json({ error: message });
    }
  };
}