import {User} from "~/dto/chat";
import {Group} from "~/dto/task";

export class BoardCreateRequest {
    title: string = '';
    users: User[] = [];
}

export class Board {
    id!:    number;      // Идентификатор
    title:  string = ''; // надпись
    order: number = 0;   // сортировка
    owner!: User;        // владелец, <модель_пользователя>
    tasks!: any[];       // задачи КОТОРЫЕ НЕ РАСПРЕДЕЛЕНЫ по ГРУППАМ
    groups!: Group[];      // группы с задачами
    users!: User[]|null;      // список пользователей, которые имеют доступ к доске
}