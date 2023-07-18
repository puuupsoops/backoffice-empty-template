import { Collection } from './collection'
export class Stack {
    fro: Collection;
    specoda: Collection;

    constructor(data: any) {
        this.fro     = new Collection(data.fro);
        this.specoda = new Collection(data.specoda);
    }
}