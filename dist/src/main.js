"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const session = require("express-session");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets(path_1.resolve('./src/'));
    app.setBaseViewsDir(path_1.resolve('./src/views'));
    app.setViewEngine('ejs');
    app.enableCors();
    app.use(express.urlencoded({
        extended: true,
    }));
    app.use(express.json());
    app.use(session({
        secret: 'MadeByJaskiratSukrutSumit',
        resave: true,
        saveUninitialized: false,
    }));
    await app.listen(process.env.PORT || 8080);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map