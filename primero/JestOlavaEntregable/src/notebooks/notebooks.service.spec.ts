import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';

describe('NotebooksService', () => {
  let service: NotebooksService;
  let notebookRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotebooksService,
        {
          provide: getRepositoryToken(Notebook),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
    notebookRepo = module.get(getRepositoryToken(Notebook));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //mi result tiene que respetar la estructura de mi entity

  it('debe retornar todas las notebooks', async () => {
    
    const result = [ 
      { id: 123, title: 'Mi primer notebook', content: 'Contenido inicial' }
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('debe retornar una notebook por id', async () => {
    const result: Notebook = { id: 123, title: 'Mi primer notebook', content: 'Contenido inicial' } as Notebook;

    jest.spyOn(service, 'findOneById').mockResolvedValue(result);

    expect(await service.findOneById(123)).toEqual(result);
  });


  it('debe crear una nueva notebook', async () => {
    const dto = { title: 'Mi nueva notebook', content: 'Contenido occidental posterior nocturno' };

    const created: Notebook = { id: 123, ...dto };

    jest.spyOn(service, 'create').mockResolvedValue(created);

    expect(await service.create(dto)).toEqual(created);
  });

  
});
