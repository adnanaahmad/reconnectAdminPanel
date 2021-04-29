export interface UserManagementModel{
  list: Array<UserModel>
}
export interface UserModel{
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
  email: string;
  _id: string;
  company: any;
  accountStatus: string
  addresses: []
  birthday: Date
  createdAt: Date
  realEstateLicenseNumber: string;
}
