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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const comments_dto_1 = require("./dtos/comments.dto");
const idGenerator_1 = require("../shared/helpers/idGenerator");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async create(request, comment, res) {
        try {
            const { id: userId } = request['user'];
            const latest = await this.commentsService.find({
                skip: 0,
                take: 1,
                order: { createdAt: 'DESC' },
            });
            let number = 1;
            if (latest.length)
                number = Number(latest[0].id.substring(2)) + 1;
            const newComment = {
                id: (0, idGenerator_1.idGenerator)(20, number, 'CM'),
                userId,
                ...comment,
            };
            const result = await this.commentsService.create(newComment);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getByService(serviceId, res) {
        try {
            const result = await this.commentsService.find({
                select: {
                    createdAt: true,
                    id: true,
                    content: true,
                    rating: true,
                    user: { id: true, name: true, image: true },
                },
                where: { serviceId: serviceId },
                relations: { user: true },
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async deleteUserComment(request, id, res) {
        try {
            const user = request['user'];
            const comment = await this.commentsService.getById(id);
            if (!comment) {
                res.status(400).send('comment_not_exist');
            }
            if (!user.roles.includes('manager') && comment.userId != user.id) {
                res.status(403).send('Forbidden');
            }
            const result = await this.commentsService.remove(id);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        comments_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/service/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getByService", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteUserComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)('comments'),
    (0, swagger_1.ApiTags)('Comments'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map