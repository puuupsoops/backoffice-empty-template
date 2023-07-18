export class Persona {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    full: string;
    birthday: number;
    idate: number;
    credo: string | null;
    constructor(persona: any){
        this.id = persona.id;
        this.name = persona.name;
        this.surname = persona.surname;
        this.patronymic = persona.patronymic;
        this.full = persona.full;
        this.birthday = persona.birthday;
        this.idate = persona.idate;
        this.credo = persona.credo;
    }
}