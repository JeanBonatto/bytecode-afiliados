import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Item } from './Item';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  idItem: string;

  @Column({ type: 'text', nullable: true })
  imageBase64: string;

  @Column({ type: 'text', nullable: true })
  linkImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamento
  @ManyToOne(() => Item, item => item.images)
  @JoinColumn({ name: 'idItem' })
  item: Item;
}