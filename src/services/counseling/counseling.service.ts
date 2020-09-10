import { Injectable } from "@nestjs/common";

@Injectable()
export class CounsellingService {
    /*
     * Multiple function will be used 
     * to provide routing to the different 
     * type of counselling.
     */

    getMedicationCounselling(){
        return 'Medication Counseling'
    }

    getEntrepreneurshipCounselling(){
        return 'Entrepreneurship Counseling';
    }
    
    getCareerCounselling(){
        return 'Caree Counsellng';
    }

    getDiethipCounselling(){
        return 'Diet Counseling';
    }
}
