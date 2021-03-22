export default interface Member {
  name: string;
  email: string;
  phone: any;
  password: string;
  membershipType: Array<string>;
  isAdmin?: string;
  //Possible Values for isAdmin are `YES` and `NO`
}
