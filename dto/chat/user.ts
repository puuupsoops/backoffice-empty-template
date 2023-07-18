import {Contacts} from "~/dto/chat/contacts";
import {Persona} from "~/dto/chat/persona";
import {Employee} from "~/dto/chat/emploee";

export class User {
    id: number;
    name?: string;
    surname?: string;
    nickname?: string;
    avatar?: string|null;

    constructor(user: any) {
        this.id = user.id;
        this.name = user.name;
        this.surname = user.surname;
        this.nickname = user.nickname;
        this.avatar = user.avatar;
    }
}

export class UserFull extends User {
    is_online: boolean;
    patronymic: string;
    credo: string;
    user: User;

    constructor(userFull: any) {
        super(userFull.user);
        this.is_online = userFull.is_online;
        this.patronymic = userFull.patronymic;
        this.credo = userFull.credo;
        this.user = new User(userFull.user);
    }
}

export class UserSelf {
    user_id: number;
    user: User;
    contacts: Contacts;
    persona: Persona;
    employee: Employee;

    constructor(UserSelf: any) {
        this.user_id = UserSelf.user_id;
        this.user = new User(UserSelf.user);
        this.contacts = new Contacts(UserSelf.contacts);
        this.persona = new Persona(UserSelf.persona);
        this.employee = new Employee(UserSelf.employee);
    }
}
