export default interface Member {
    name: string;
    email: string;
    phone: any;
    password: string;
    membershipType: Array<string>;
    isAdmin?: string;
}
