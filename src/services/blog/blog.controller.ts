import { Controller, Get } from "@nestjs/common";
import { blogService } from "./blog.service";

@Controller('blog')
export class BlogController{
    constructor(private readonly BlogService: blogService){}

    @Get()
    getBlog(){
        return this.BlogService.getBlog;
    }

    @Get('/write')
    getWriteBlog(){
        return this.BlogService.writeBlog;
    }

}