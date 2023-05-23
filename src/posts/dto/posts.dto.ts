import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PartialType} from '@nestjs/swagger'
export class createPostDto{
    
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNotEmpty()
    @IsNumber()
    authorId:number;
}

export class updatePostDto extends PartialType(createPostDto) {}


