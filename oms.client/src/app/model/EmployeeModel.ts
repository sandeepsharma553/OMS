export class EmployeeModel {
    pkUserID!: number;
    fkUserID!: number;
    loginID!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    address!: string;
    mobileNo!: string;
    emailID!: string;
    fkRoleID!: number;
    status!: number;
    createdBy!: number;
    createdDate!: Date;
    updatedBy!: number;
    updatedDate!: Date;
    Role!: string;
    constructor() {

    }
}
