import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as session from 'express-session';
import * as express from 'express';
import { start } from 'repl';
declare const module:any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve('./src/'));

  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('ejs');
  app.enableCors();
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.use(session({
    secret: 'MadeByJaskiratSukrutSumit',
    resave: true,
    saveUninitialized:false,
  }));
  
  await app.listen(process.env.PORT || 8000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(()=>app.close());
  }
}
bootstrap();
