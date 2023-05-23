import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PartialType} from '@nestjs/swagger'
export class createProfileDto{
    
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;

    @IsNotEmpty()
    @IsNumber()
    age:number;

    
}

export class updateProfileDto extends PartialType(createProfileDto) {}


