import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, { cascade: true })
  @JoinTable({ name: 'courses_tags' })
  tags!: Tag[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
