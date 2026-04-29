import { Entity, PrimaryColumn, Column, Check, BeforeInsert } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
@Check(`"feet_width" >= 0`)
@Check(`"feet_length" >= 0`)
export class Quote {
  @PrimaryColumn()
  quoteId: string;

  @BeforeInsert()
  generateId(): void {
    this.quoteId = uuidv7();
  }

  @Column({ default: 0 }) // width
  feet_width: number;

  @Column({ default: 0 }) // length
  feet_length: number;

  @Column({ default: 0 }) // $4 per square feet
  sqr_feet: number;

  @Column({ default: false }) // fee is $100
  demolition: boolean;

  @Column({ default: false }) //50 sqrt feet at cost of $4
  grout: boolean;

  @Column({ default: false }) //$100 for pickup material
  pickup: boolean;

  @Column({ default: false }) // 70 sqr feet at cost of $25
  thin_set: boolean;

  @Column({ default: 0, type: 'numeric' }) // total cost of job
  quote_total: number;
}
