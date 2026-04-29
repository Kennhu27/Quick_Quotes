import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Admin {
  @PrimaryColumn()
  adminId: string;

  @BeforeInsert()
  generateId(): void {
    this.adminId = uuidv7();
  }

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: false }) //maybe
  verifiedEmail: boolean;

  @Column()
  name: string;
}
