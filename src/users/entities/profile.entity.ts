import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { JoinColumn, OneToMany } from "typeorm";
import { Posts } from "src/posts/entities/posts.entity";

@Entity({name:'profiles'})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique:true})
    firstName: string;
  
    @Column()
    lastName: string;
    @Column({nullable:true})
    age: number;
}
