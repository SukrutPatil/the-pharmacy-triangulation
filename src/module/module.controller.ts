import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ModuleService } from './module.service';
import { Request, Response } from 'express';
@Controller('module')
export class ModuleController {
  constructor(private readonly ms: ModuleService) {}
  @Get(':id')
  async getModuleById(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const theModule = await this.ms.getModuleById(id);

    if (!theModule) res.render('404', {});
    const theAuthor = await this.ms.getModuleAuthorName(id);
    console.log(theAuthor);
    res.render('Module', {
      theModule,
      theAuthor,
      id,
      loggedInUser: req.session.loggedInUser,
    });
  }
}
