import { Controller } from '@nestjs/common';
import {JSGAuth} from './JSGAuth';
@Controller('auth')
export class AuthController extends JSGAuth{
    getLoginPage() {
        throw new Error("Method not implemented.");
    }
    getSignupPage() {
        throw new Error("Method not implemented.");
    }
    postLoginInformation() {
        throw new Error("Method not implemented.");
    }
    postSignupInformation() {
        throw new Error("Method not implemented.");
    }
    signoutAction() {
        throw new Error("Method not implemented.");
    }


}
