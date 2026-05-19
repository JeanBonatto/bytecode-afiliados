import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Plataforma } from './Plataforma';
import { Image } from './Image';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  idPlataforma: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  idItemPlataforma: string;

  @Column({ type: 'varchar', length: 255 })
  nomeItem: string;

  @Column({ type: 'text', nullable: true })
  descItem: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorItem: number;

  @Column({ type: 'text', nullable: true })
  linkItem: string;

  @Column({ type: 'text', nullable: true })
  linkAfiliado: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vendedor: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  valorAvaliacao: number;

  @Column({ type: 'integer', default: 0 })
  itemsVendidos: number;

  @Column({ type: 'boolean', default: false })
  entregaFull: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamentos
  @ManyToOne(() => Plataforma, plataforma => plataforma.items)
  @JoinColumn({ name: 'idPlataforma' })
  plataforma: Plataforma;

  @OneToMany(() => Image, image => image.item)
  images: Image[];
}