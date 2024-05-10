import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BankAccount, User, UserRole } from './entities/user.entity';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { UserRoleEnum } from './enums/user-role.enum';
import { createRequest, createResponse } from 'node-mocks-http';
import { JwtModule, JwtService } from '@nestjs/jwt';

const USER = {
  id: '00000001',
  email: 'example@gmail.com',
  password: 'password',
  name: 'name',
  dob: new Date('2002-12-02'),
  phone: '0123456789',
  image: 'image_link',
} as User;

const ROLE = {
  id: 1,
  role: UserRoleEnum.USER,
} as UserRole;

const BANK_ACCOUNT = {
  id: 1,
  accountNo: '01234567',
  bank: 'bank',
} as BankAccount;

const USER_REQ = {
  id: '00000001',
  role: [UserRoleEnum.USER],
};

describe('UsersController', () => {
  let userController: UserController;
  let userService: UsersService;
  let userRepository: Repository<User>;
  let connection: DataSource;
  let req: any, res: any;

  beforeAll(async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      url: 'postgres://postgres:postgres@127.0.0.1:5432/pakislot-test',
      dropSchema: true,
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      synchronize: true,
    });
    connection = await dataSource.initialize();
    userRepository = connection.getRepository(User);

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(() => {
    req = createRequest();
    res = createResponse();
  });

  afterEach(async () => {
    // Fetch all the entities
    const entities = connection.entityMetadatas;

    for (const entity of entities) {
      const repository = connection.getRepository(entity.name); // Get repository
      await repository.createQueryBuilder().delete().execute(); // Clear each entity table's content
    }
  });

  describe('findAll', () => {
    it('should return an array of user objects', async () => {
      const filteredResult = [
        { ...USER, bankAccount: [BANK_ACCOUNT], role: [ROLE] },
      ] as User[];

      jest.spyOn(userService, 'find').mockResolvedValue(filteredResult);

      const expectedResult = [
        { ...USER, bankAccount: [BANK_ACCOUNT], role: [ROLE.role] },
      ];

      await userController.findAll(res);
      expect(await res._getData()).toEqual(expectedResult);
    });
  });

  describe('find', () => {
    it('should return a user object', async () => {
      req['user'] = { ...USER_REQ };
      const filteredResult = [
        { ...USER, bankAccount: [BANK_ACCOUNT], role: [ROLE] },
      ] as User[];

      jest.spyOn(userService, 'find').mockResolvedValue(filteredResult);

      const expectedResult = {
        ...USER,
        bankAccount: [BANK_ACCOUNT],
        role: [ROLE.role],
      };

      await userController.find(req, res);
      expect(await res._getData()).toEqual(expectedResult);
    });
  });

  describe('findByQuery', () => {
    it('should return the user object according to id', async () => {
      const filteredResult = [{ ...USER }] as User[];

      jest.spyOn(userService, 'find').mockResolvedValue(filteredResult);

      await userController.findByQuery({ id: USER.id }, res);
      expect(await res._getData()).toBe(filteredResult);
    });

    it('should return the user object according to role', async () => {
      const filteredResult = [] as User[];

      jest.spyOn(userService, 'find').mockResolvedValue(filteredResult);

      await userController.findByQuery({ role: 'manager' }, res);
      expect(await res._getData()).toBe(filteredResult);
    });
  });

  describe('update', () => {
    it('should update the user profile', async () => {
      req['user'] = { ...USER_REQ };
      const user = { ...USER, role: [ROLE.role] };
      user.name = 'Update name';
      jest.spyOn(userService, 'update').mockResolvedValue(true);

      await userController.update(req, { ...user }, res);
      expect(await res._getData()).toBeTruthy();
    });
  });

  describe('updateForManager', () => {
    it('should update the user profile', async () => {
      req['user'] = { ...USER_REQ };
      const user = { ...USER, role: [ROLE.role] };
      user.name = 'Update name';
      jest.spyOn(userService, 'update').mockResolvedValue(true);

      await userController.updateForManager('1', { ...user }, res);
      expect(await res._getData()).toBeTruthy();
    });
  });

  describe('create', () => {
    it('should return the create result as success if not duplicated', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const user = {
        ...USER,
        role: [ROLE.role],
        bankAccount: [
          { accountNo: BANK_ACCOUNT.accountNo, bank: BANK_ACCOUNT.bank },
        ],
      };
      await userController.create(user, res);
      const data = await res._getData();
      const [first, ...rest] = data.password.split('$');
      expect(first).toBeDefined();
    });

    it('should return error if duplicated', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue({ ...USER } as User);

      await userController.create({ ...USER, role: [], bankAccount: [] }, res);
      expect(await res._getData()).toBe('email_existed');
    });
  });
});
