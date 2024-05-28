import { Controller, Post, Put, Delete, Param, Body, Get, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import * as PDFDocument from 'pdfkit';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('pdf')
  async getPdf(@Res() res): Promise<void> {
    const users = await this.usersService.findAll();
    const doc = new PDFDocument();
    const filePath = join(__dirname, '..', 'users.pdf');

    const writeStream = createWriteStream(filePath);
    doc.pipe(writeStream);

    users.forEach((user, index) => {
      doc.text(`${index + 1}. ${user.name} - ${user.email} - ${user.phoneNumber} - ${user.address}`);
      doc.moveDown();
    });

    doc.end();

    writeStream.on('finish', () => {
      const file = createReadStream(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');
      file.pipe(res);
    });
  }
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: Partial<User>): Promise<void> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
