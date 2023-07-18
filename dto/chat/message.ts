import { User } from './user';

export class Message {
    id: number;
    from: User;
    to: User;
    message: {
        type: string,
        body: string
    };
    date: number;
    reply: number | null;

    constructor(data: any) {
        this.id = data.id;
        this.from = new User(data.from);
        this.to = new User(data.to);
        this.message = {
            type: data.message.type,
            body: data.message.body
        };
        this.date = data.date;
        this.reply = data.reply;
    }
}

export class MessageContainer {
    chat_id?: number;
    message?: Message;
}

export class ChatMessages {
    chat_id!: number;
    info!: {
        count: number;
        offset: number;
        limit: number;
    };
    messages!: Message[];
}