export class Employee {

    id: number;
    organization: {
        guid: string;
        title: string;
    };
    department: {
        guid: string;
        title: string;
    };
    position: {
        guid: string;
        title: string;
    };
    comment: string;

    constructor(employee: any) {
        this.id = employee.id;
        this.organization = {guid: employee.organization.guid, title: employee.organization.title};
        this.department = {guid: employee.department.guid, title: employee.department.title};
        this.position = {guid: employee.position.guid, title: employee.position.title};
        this.comment = employee.comment;
    }
}
