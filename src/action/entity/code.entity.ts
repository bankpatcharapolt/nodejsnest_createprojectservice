import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class CODE {
  @Column()
  I_CODE: string;
 
  @Column()
  E_CODE_E: string;

  @Column()
  E_CODE_T: string;

  @Column()
  S_ORDER: string;
}