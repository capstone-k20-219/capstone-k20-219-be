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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
const bcrypt = require("bcrypt");
const user_refresh_token_service_1 = require("./user-refresh-token.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, userRefreshTokensService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userRefreshTokensService = userRefreshTokensService;
    }
    async signIn(email, password) {
        const user = await this.usersService.findOne({
            where: { email: email },
            relations: { role: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: user.role.map((item) => item.role),
            };
            console.log(JSON.stringify(payload));
            const tokens = await this._generateJWT(payload, true);
            return { ...tokens, id: user.id };
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    checkPermission(userRoles, checkRoles) {
        let result = false;
        for (const role of checkRoles) {
            if (userRoles.includes(role)) {
                result = true;
                break;
            }
        }
        return result;
    }
    async refresh(refreshToken) {
        try {
            const payload = await this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const isRefreshVerified = await this.verifyRefresh(payload.id, refreshToken);
            if (!isRefreshVerified)
                throw new common_1.UnauthorizedException();
            const refreshPayload = {
                id: payload.id,
                email: payload.email,
                name: payload.name,
                roles: payload.roles,
            };
            const token = await this._generateJWT(refreshPayload);
            return { ...token };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async logOut(userId, all, refreshToken = null) {
        try {
            if (!all) {
                const tokenList = await this.userRefreshTokensService.find({
                    where: { userId },
                });
                let refreshId = -1;
                for (const token of tokenList) {
                    const isEqual = await bcrypt.compare(this.reserve(refreshToken), token.refreshToken);
                    if (isEqual) {
                        refreshId = token.id;
                        break;
                    }
                }
                if (refreshId === -1)
                    throw new common_1.ForbiddenException();
                const result = await this.userRefreshTokensService.remove(refreshId);
                return result;
            }
            else {
                const result = await this.userRefreshTokensService.removeByConditions({
                    userId,
                });
                return result;
            }
        }
        catch (err) {
            throw new common_1.ForbiddenException();
        }
    }
    async _generateJWT(payload, refresh = false) {
        console.log(`JWT token payload ${JSON.stringify(payload)}`);
        const access_token = this.jwtService.sign(payload);
        if (refresh) {
            const refresh_token = this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRED,
            });
            const savedToken = await bcrypt.hash(this.reserve(refresh_token), 10);
            await this.userRefreshTokensService.create({
                userId: payload.id,
                refreshToken: savedToken,
            });
            return { refresh_token, access_token };
        }
        else {
            return { access_token };
        }
    }
    reserve(s) {
        return s.split('').reverse().join('');
    }
    async verifyRefresh(id, refreshToken) {
        const tokenList = await this.userRefreshTokensService.find({
            where: { userId: id },
        });
        let isVerified = false;
        for (const token of tokenList) {
            const isEqual = await bcrypt.compare(this.reserve(refreshToken), token.refreshToken);
            if (isEqual) {
                isVerified = true;
                break;
            }
        }
        return isVerified;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        jwt_1.JwtService,
        user_refresh_token_service_1.UserRefreshTokensService])
], AuthService);
//# sourceMappingURL=auth.service.js.map