import { Injectable } from '@nestjs/common';
import {Pool} from 'pg'
@Injectable()
export class DatabaseService {
 pool = new Pool({
    user:'postgres',
    host:'database.server.com',
    database:'pharmadb',
    password: 'toor'
})

}
