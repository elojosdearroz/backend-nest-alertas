import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumberString, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @ApiProperty()
    @IsString({message: 'El nombre de usuario debe ser una cadena de texto.'})
    @Transform(({ value }) => value.trim().toLowerCase())
    first_name: string

    @ApiProperty()
    @IsString({message: 'El apellido de usuario debe ser una cadena de texto.'})
    @Transform(({ value }) => value.trim().toLowerCase())
    last_name: string

    @ApiProperty()
    @IsNumberString()
    @Length(8, 8)
    @Transform(({ value }) => value.trim())
    phone: string

    @ApiProperty()
    @IsString({message: 'La contraseña debe ser una cadena de texto.'})
    @MinLength(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    @MaxLength(20, {message: 'La contraseña no debe exceder los 20 caracteres'})
    @Matches(/^\S+$/, {message: 'La contraseña no debe contener espacios',})
    password: string
}