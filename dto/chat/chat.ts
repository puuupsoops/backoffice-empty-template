import { User } from './User';

export class Chat {
    id: number;
    owner: User;
    interlocutor: User;
    create_at: number;

    constructor(chat: any) {
        this.id = chat.id;
        this.owner = new User(chat.owner);
        this.interlocutor = new User(chat.interlocutor);
        this.create_at = chat.create_at;
    }
}