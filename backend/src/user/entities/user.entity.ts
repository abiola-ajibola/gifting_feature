import { Gift } from '../../gift/entities/gift.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Gift, (gift) => gift.giver, { nullable: true })
  giftsFrom: Gift[];

  @OneToMany(() => Gift, (gift) => gift.receiver, { nullable: true })
  giftsTo: Gift[];
}
