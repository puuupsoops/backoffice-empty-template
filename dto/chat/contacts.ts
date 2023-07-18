export class Contacts {
    id: number;
    work: {
        email: string;
        phone: string;
    };
    personal: {
        email: string | null;
        phone: string | null;
    };

    constructor(contacts: any) {
        this.id = contacts.id;
        this.work = { email: contacts.work.email, phone: contacts.work.phone };
        this.personal = { email: contacts.personal.email, phone: contacts.personal.phone };
    }
}