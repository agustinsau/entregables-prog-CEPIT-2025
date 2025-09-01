// notebooks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { Notebook } from './entities/notebook.entity';

@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) {}

  @Get()
  async getAll(): Promise<Notebook[]> {
    try {
      return await this.notebooksService.findAll();

    } catch (error) {
      throw new HttpException(
        'Error retrieving notebooks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOneById(id: number): Promise<Notebook | null> {
    try {
      return await this.notebooksService.findOneById(id);

    } catch (error) {

        if (error.status === 404) {
          //console.log(error)
          throw error;
        }
      
        throw new HttpException(
          'Error retrieving notebooks',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  }


  @Post()
  async create(@Body() createNotebookDto: CreateNotebookDto): Promise<Notebook> {
    try {
      return await this.notebooksService.create(createNotebookDto);
    } catch (error) {
      throw new HttpException(
        'Error creating notebook',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}