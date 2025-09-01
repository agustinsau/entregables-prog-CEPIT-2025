import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { Notebook } from './entities/notebook.entity';
import { NotFoundException } from '@nestjs/common';

describe('NotebooksController', () => {
  let controller: NotebooksController;
  let service: NotebooksService;

  const mockNotebooksService = {
    findAll: jest.fn(),
    findOneById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        {
          provide: NotebooksService,
          useValue: mockNotebooksService,
        },
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
    service = module.get<NotebooksService>(NotebooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll tiene que retornar todas las notebooks', async () => {
    let data: Notebook[] = [
      { id: 1, title: 'Lenovo', content: '16 pulgadas' } as Notebook,
      { id: 2, title: 'HP', content: '15 pulgadas' } as Notebook,
    ];

    mockNotebooksService.findAll.mockResolvedValue(data);

    expect(await controller.getAll()).toEqual(data);
  });

  it('getOneById tiene que retornar una notebook existente', async () => {
    let notebook: Notebook = { id: 1, title: 'Lenovo', content: '16 pulgadas' } as Notebook;

    mockNotebooksService.findOneById.mockResolvedValue(notebook);

    expect(await controller.getOneById(1)).toEqual(notebook);
  });

  it('getOneById debería lanzar NotFoundException si no existe', async () => {
    mockNotebooksService.findOneById.mockRejectedValue(new NotFoundException());

    await expect(controller.getOneById(999)).rejects.toThrow(NotFoundException);
  });

  it('create tiene que crear una nueva notebook', async () => {
    const dto = { title: 'Mi primera nueva notebook', content: 'prueba' };
    const created: Notebook = { id: 123, ...dto } as Notebook;

    mockNotebooksService.create.mockResolvedValue(created);

    expect(await controller.create(dto)).toEqual(created);
  });
});
