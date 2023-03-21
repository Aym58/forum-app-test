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

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  homePage: string;

  @Column({
    nullable: true,
  })
  parentId: number;

  @Column('int', { array: true, nullable: true })
  replyIds: number[];

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
