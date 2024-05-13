"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_request_dto_1 = require("./dtos/user.request.dto");
const bcrypt = require("bcrypt");
const user_service_1 = require("./user.service");
const user_role_enum_1 = require("./enums/user-role.enum");
const auth_guard_1 = require("../auth/auth.guard");
const public_decorator_1 = require("../decorators/public.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const idGenerator_1 = require("../shared/helpers/idGenerator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.salt = 10;
    }
    async create(user, res) {
        try {
            const isDuplicate = await this.userService.findOne({
                where: { email: user.email },
            });
            if (isDuplicate) {
                return res.status(400).send('email_existed');
            }
            const hashedPassword = await bcrypt.hash(user.password, this.salt);
            const latest = await this.userService.find({
                skip: 0,
                take: 1,
                order: { createdAt: 'DESC' },
            });
            let number = 1;
            if (latest.length)
                number = Number(latest[0].id) + 1;
            const newUser = {
                ...user,
                id: (0, idGenerator_1.idGenerator)(8, number),
                password: hashedPassword,
                role: user.role.map((item) => {
                    return { role: item };
                }),
            };
            const result = await this.userService.create(newUser);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async find(request, res) {
        try {
            const { id } = request['user'];
            const user = (await this.userService.find({
                where: { id },
                relations: { role: true, bankAccount: true },
            }))[0];
            const result = {
                ...user,
                role: user.role.map((item) => item.role),
            };
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async findAll(res) {
        try {
            const users = await this.userService.find({ relations: { role: true } });
            const result = [];
            for (const user of users) {
                result.push({
                    ...user,
                    role: user.role.map((item) => item.role),
                });
            }
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async findByQuery(filter, res) {
        try {
            const cond = {};
            if (Object.keys(filter).length) {
                cond['where'] = {};
            }
            if (filter.id) {
                cond['where']['id'] = filter.id;
            }
            if (filter.role) {
                cond['where']['role'] = { role: filter.role };
            }
            const user = await this.userService.find(cond);
            res.status(200).send(user);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async update(request, updateUserDto, res) {
        try {
            const { id } = request['user'];
            const user = await this.userService.getById(id);
            const updateUser = {
                ...updateUserDto,
                role: user.role,
            };
            if (updateUserDto.password) {
                const hashedPassword = await bcrypt.hash(updateUserDto.password, this.salt);
                updateUser.password = hashedPassword;
            }
            const result = await this.userService.update(id, updateUser);
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async updateForManager(id, updateUserDto, res) {
        try {
            const updateUser = {
                ...updateUserDto,
                role: updateUserDto.role.map((item) => {
                    return { role: item };
                }),
            };
            if (updateUserDto.password) {
                const hashedPassword = await bcrypt.hash(updateUserDto.password, this.salt);
                updateUser.password = hashedPassword;
            }
            const result = await this.userService.update(id, updateUser);
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async delete(request, res) {
        try {
            const { id } = request['user'];
            const result = await this.userService.remove(id);
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async deleteForManager(id, res) {
        try {
            const result = await this.userService.remove(id);
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.CreateUserRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findByQuery'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.GetUserRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByQuery", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.USER),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        user_request_dto_1.UpdateUserRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_request_dto_1.UpdateUserRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateForManager", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteForManager", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UserController);
//# sourceMappingURL=user.controller.js.map