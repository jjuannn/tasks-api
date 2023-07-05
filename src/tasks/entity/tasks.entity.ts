import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityTypes } from '../enum/priority.enum';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', default: PriorityTypes.LOW, enum: PriorityTypes })
  priority: PriorityTypes;
}
