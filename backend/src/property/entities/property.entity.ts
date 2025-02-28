import { Gift } from 'src/gift/entities/gift.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column('decimal')
  price: number;

  @Column()
  location: string;

  @Column()
  isAvailable: boolean;

  @OneToMany(() => Gift, (gift) => gift.property)
  gifts: Gift[];
}
