import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'Post' })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (User) => User.posts, {
    nullable: false,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  user: UserEntity;
}
