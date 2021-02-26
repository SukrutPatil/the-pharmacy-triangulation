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
var SessionExecutorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExecutorService = void 0;
const common_1 = require("@nestjs/common");
let SessionExecutorService = SessionExecutorService_1 = class SessionExecutorService {
    constructor() {
        console.debug(`SessionExecutorService ${SessionExecutorService_1.callTimes++}`);
    }
    sessionExecutor(req, res, ifLoggedIn, ifNotLoggedIn) {
        if (req.session.loggedInUser)
            ifLoggedIn();
        else
            ifNotLoggedIn();
    }
    adminSessionExecutor(req, res, ifLoggedIn, ifNotLoggedIn) {
        req.session.adminEmail ? ifLoggedIn() : ifNotLoggedIn();
    }
};
SessionExecutorService.callTimes = 0;
SessionExecutorService = SessionExecutorService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SessionExecutorService);
exports.SessionExecutorService = SessionExecutorService;
//# sourceMappingURL=session-executor.service.js.map