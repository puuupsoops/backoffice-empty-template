export class Document {
    title: string;
    date_from: string;

    name: string;

    type: string;

    file: string;

    constructor(document: any) {
        this.title = document.title;
        this.date_from = document.date_from;
        this.name = document.name;
        this.type = document.type;
        this.file = document.file;
    }
}