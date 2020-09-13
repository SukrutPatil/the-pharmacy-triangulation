import { Controller, Get } from '@nestjs/common';
import { CounsellingService } from './counseling.service';

@Controller('counseling')
export class CounselingController {
    constructor(private readonly CounselingService: CounsellingService){}

    @Get('/medication')
    getMedicationCounselling(){
        return this.CounselingService.getMedicationCounselling();
    }

    @Get('/entrepreneurship')
    getEntrepreneurshipCounselling(){
       return this.CounselingService.getEntrepreneurshipCounselling();
    }

    @Get('/career')
    getCareerCounselling(){
        return this.CounselingService.getCareerCounselling();
    }

    @Get('/diet')
    getDiethipCounselling(){
       return this.CounselingService.getDiethipCounselling();
    }
}
