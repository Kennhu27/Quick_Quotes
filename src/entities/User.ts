import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @BeforeInsert()
  generateId(): void {
    this.userId = uuidv7();
  }

  @Column({ unique: true }) //replace or remove
  email: string;

  @Column() // replace or remove
  passwordHash: string;

  @Column({ default: false }) //remove
  verifiedEmail: boolean;

  @Column() //remove
  name: string;

  @Column({ default: 0 }) //remove
  profileViews: number;
}
