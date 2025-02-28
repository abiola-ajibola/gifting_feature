import { Property } from 'src/property/entities/property.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  accepted: boolean;

  @ManyToOne(() => Property, (property) => property.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  property?: Property;

  @ManyToOne(() => User, (user) => user.giftsFrom, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  giver: User;

  @ManyToOne(() => User, (user) => user.giftsTo, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  receiver?: User;

  @Column({ nullable: false })
  receiverEmail: string;

  @Column({ nullable: false })
  giverId: number;

  @Column({ nullable: false })
  propertyId: number;

  get receiverId(): number {
    return this.receiver.id;
  }
}
