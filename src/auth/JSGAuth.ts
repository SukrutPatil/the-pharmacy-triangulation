export abstract class JSGAuth {
    abstract getLoginPage():any;
    abstract getSignupPage():any;
    abstract postLoginInformation():any;
    abstract postSignupInformation():any;
    abstract signoutAction():any;
}