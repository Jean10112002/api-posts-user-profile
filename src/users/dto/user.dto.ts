import { IsNotEmpty, IsString } from "class-validator";
import { PartialType} from '@nestjs/swagger'
export class createUserDto{
    
    @IsNotEmpty()
    @IsString()
    userName:string;

    @IsNotEmpty()
    @IsString()
    password:string;



    
}

export class updateUserDto extends PartialType(createUserDto) {}


