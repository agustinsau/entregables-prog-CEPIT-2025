// notebooks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private readonly notebookRepo: Repository<Notebook>,
  ) {}

  async findAll(): Promise<Notebook[]> {
    return this.notebookRepo.find();
  }

  async findOneById(id: number): Promise<Notebook | null>  {
      let notebook = await this.notebookRepo.findOne({ where: { id } });
      
      return notebook;
  }

  async create(dto: CreateNotebookDto): Promise<Notebook> {
    const notebook = this.notebookRepo.create(dto);
    return this.notebookRepo.save(notebook);
  }
}