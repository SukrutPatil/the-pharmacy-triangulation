import { Injectable } from "@nestjs/common";

@Injectable()
export class blogService {
    getBlog(){
        return 'Show Blog';
    }

    writeBlog(){    
        return 'Blog writing/editing section';
    }
}