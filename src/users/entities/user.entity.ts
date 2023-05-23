import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { JoinColumn, OneToMany } from "typeorm";
import { Posts } from "src/posts/entities/posts.entity";
import { Profile } from './profile.entity';

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  userName: string;

  @Column()
  password: string;

  @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
  createAt: Date;

  @Column({nullable:true})
  authStrategy: string;

  @OneToOne(()=>Profile)
  @JoinColumn()
  profile:Profile

  @OneToMany(()=>Posts,posts=>posts.author)
  @JoinColumn()
  posts:Posts[];
}
