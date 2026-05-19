import { Router } from 'express';
import { ItemController } from '../controllers/ItemController';

const router = Router();
const itemController = new ItemController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *         idPlataforma:
 *           type: string
 *           format: uuid
 *         nomeItem:
 *           type: string
 *           example: "Notebook Dell Inspiron 15"
 *         descItem:
 *           type: string
 *         valorItem:
 *           type: number
 *           example: 2499.90
 *         linkItem:
 *           type: string
 *         linkAfiliado:
 *           type: string
 *         vendedor:
 *           type: string
 *         valorAvaliacao:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           example: 4.7
 *         itemsVendidos:
 *           type: integer
 *           example: 320
 *         entregaFull:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateItem:
 *       type: object
 *       required:
 *         - idPlataforma
 *         - nomeItem
 *         - valorItem
 *       properties:
 *         idPlataforma:
 *           type: string
 *           format: uuid
 *         nomeItem:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           example: "Notebook Dell Inspiron 15"
 *         descItem:
 *           type: string
 *         valorItem:
 *           type: number
 *           minimum: 0
 *           example: 2499.90
 *         linkItem:
 *           type: string
 *         linkAfiliado:
 *           type: string
 *         vendedor:
 *           type: string
 *         valorAvaliacao:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *         itemsVendidos:
 *           type: integer
 *           minimum: 0
 *         entregaFull:
 *           type: boolean
 *     PaginatedItems:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         total:
 *           type: integer
 *         page:
 *           type: integer
 *         limit:
 *           type: integer
 *         totalPages:
 *           type: integer
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Lista todos os items com paginação
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Itens por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Busca por nome do item
 *     responses:
 *       200:
 *         description: Lista paginada de items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedItems'
 */
router.get('/', itemController.listAll);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Busca item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', itemController.getById);

/**
 * @swagger
 * /api/items/plataforma/{idPlataforma}:
 *   get:
 *     summary: Lista items de uma plataforma
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: idPlataforma
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Items da plataforma
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       404:
 *         description: Plataforma não encontrada
 */
router.get('/plataforma/:idPlataforma', itemController.getByPlataforma);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Cria novo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateItem'
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Plataforma não encontrada
 */
router.post('/', itemController.create);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Atualiza item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateItem'
 *     responses:
 *       200:
 *         description: Item atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 */
router.put('/:id', itemController.update);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Remove item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Item removido com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.delete('/:id', itemController.delete);

export default router;