
export class WSSend<T> {
    execute: {
        type: string;
        cmd: string|string[];
        data: T;
    }
    constructor(WSSend: any) {
        this.execute = {
            type: WSSend.type,
            cmd: WSSend.cmd,
            data: WSSend.data as T
        };
    }
    toString() {
        return JSON.stringify(this);
    }
};

export class MessageWS {
    chat_id: number;
    from: number;
    to: number;
    message: {
        type: string,
        body: string
    }
    constructor(MessageWS: any) {
        this.chat_id = MessageWS.chat_id;
        this.from = MessageWS.from;
        this.to = MessageWS.to;
        this.message = {
            type: "text",
            body: MessageWS.message.body
        };
    }

    toString() {
        return JSON.stringify(this);
    }
}