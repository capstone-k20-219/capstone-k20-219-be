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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.BankAccount = exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const user_role_enum_1 = require("../enums/user-role.enum");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const comment_entity_1 = require("../../comments/entities/comment.entity");
const parking_ticket_entity_1 = require("../../parking-tickets/entities/parking-ticket.entity");
const user_refresh_token_entity_1 = require("../../auth/entities/user-refresh-token.entity");
let User = class User extends base_entity_1.Base {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BankAccount, (bankAccount) => bankAccount.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRole, (role) => role.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parking_ticket_entity_1.ParkingTicket, (ticket) => ticket.user),
    __metadata("design:type", Array)
], User.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_refresh_token_entity_1.UserRefreshToken, (token) => token.user),
    __metadata("design:type", Array)
], User.prototype, "tokens", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
let BankAccount = class BankAccount extends typeorm_1.BaseEntity {
};
exports.BankAccount = BankAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BankAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BankAccount.prototype, "accountNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BankAccount.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.bankAccount, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", User)
], BankAccount.prototype, "user", void 0);
exports.BankAccount = BankAccount = __decorate([
    (0, typeorm_1.Entity)('bank_account')
], BankAccount);
let UserRole = class UserRole extends typeorm_1.BaseEntity {
};
exports.UserRole = UserRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_role_enum_1.UserRoleEnum }),
    __metadata("design:type", String)
], UserRole.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.role, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", User)
], UserRole.prototype, "user", void 0);
exports.UserRole = UserRole = __decorate([
    (0, typeorm_1.Entity)('user_role')
], UserRole);
//# sourceMappingURL=user.entity.js.map