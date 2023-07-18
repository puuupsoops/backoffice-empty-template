import { Document } from './index'

export class Collection {
    id: number;
    code: string;
    title: string;
    text: string;
    docs: {
        // Уставные и другие важные документы
        title: string;
        items: Document[];
    };
    poa: {
        // Доверенности
        title: string;
        items: Document[];
    };
    constructor(collection: any) {
        this.id = collection.id;
        this.code = collection.code;
        this.title = collection.title;
        this.text = collection.text;
        this.docs = {title: "Уставные и другие важные документы", items: []};
        this.poa = {title: "Доверенности", items: []};

        collection.docs.forEach( (value: string, index: number) =>{ this.docs.items.push(new Document(value)) } );
        collection.poa.forEach( (value: string, index: number) =>{ this.poa.items.push(new Document(value)) } );
    }

}