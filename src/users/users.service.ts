import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'abhi',
      email: 'abhi@email.com',
      role: 'sw',
    },
    {
      id: 2,
      name: 'ramesh',
      email: 'ramesh@email.com',
      role: 'pm',
    },
    {
      id: 3,
      name: 'suresh',
      email: 'suresh@email.com',
      role: 'qa',
    },
    {
      id: 4,
      name: 'funesh',
      email: 'funesh@email.com',
      role: 'dev',
    },
    {
      id: 5,
      name: 'rajesh',
      email: 'rajesh@email.com',
      role: 'dev',
    },
  ];

  findAll(role?: 'qa' | 'dev' | 'sw' | 'pm') {
    if (role) {
      const roles = this.users.filter((user) => user.role === role);

      if (roles.length === 0) {
        return {
          data: {},
          message: `Role ${role} not found`,
          statusCode: 404,
          status: 'fail',
        };
      }
      return {
        data: roles,
        message: 'Users found',
        statusCode: 200,
        status: 'success',
      };
    }
    return {
      data: this.users,
      message: 'All users fetched',
      statusCode: 200,
      status: 'success',
    };
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(createuserdto: createUserDto) {
    const hidhId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: hidhId[0].id + 1,
      ...createuserdto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateuserdto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateuserdto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
