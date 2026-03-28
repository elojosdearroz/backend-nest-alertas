import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>
    ) {}

    async craete(createUserDto: CreateUserDto){
        const {phone, password, ...rest} = createUserDto

        const existPhone = await this.usersRepository.findOne({
            where: {phone}
        });
        if (existPhone){
            throw new BadRequestException(`Ya hay un usuario registrado con el numero "${phone}"`)
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const newUser = this.usersRepository.create({
            phone,
            password: hashPassword,
            ...rest
        })

        await this.usersRepository.save(newUser);

        //variable con el mismo nombre mas arriba ojo con eso
        const{password:_ , ...userData} = newUser

        return userData;
    }

    findAll(){
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User>{
        const user = await this.usersRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(`El user con ID ${id} no se encontro`)
        }
        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto){
        const user = await this.findOne(id)
        const {password, phone, ...rest} = updateUserDto

        Object.assign(user, rest);

        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<{ message: string }>{
        const result = await this.usersRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`El user con ID ${id} no se encontro`)
        }
        return { message: "Usuario eliminado correctamente" };
    }
}
