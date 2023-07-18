import {User} from "~/dto/chat";

export  class TaskCreateRequest {
    border_id: number;
    group_id: number | null;
    title: string;
    description: string;

    constructor(memorandum: any) {
        this.border_id = 9; // задаем значение по умолчанию
        this.group_id = null; // задаем значение по умолчанию
        this.title = memorandum.title;
        this.description = memorandum.description;
    }
}

export class Task {
    id!:             number; // Идентификатор задачи
    border_id!:      number; // Идентификатор доски, которой принадлежит задача
    group_id!:       number; // Идентификатор группы, которой принадлежит задача, может быть null
    title!:          string; // Заголовок задачи
    description!:    string; // Описание-текст задачи
    order!:          number;
    todo!:           any[]; // позиции списка todo-list если присутствует { title: "text",check: false, order: 10, user: null }
    owner!:          User; // владелец, <модель_пользователя>
    executors!:      User[]|null; // исполнители <модель_пользователя>[]
    observers!:      User[]|null; // наблюдатели <модель_пользователя>[]
    state!:          any; // статус текущий
    statuses!:       any[]; // статусы, в какие состояния можно отправить задачу
    labels!:         any[]; // метки { text: "", color: "#" }
    create_at!:      number; // timestamp - дата создания
    active_from!:    number; //timestamp - дата начала активности задачи
    active_to!:      number; // timestamp - дата окончания активности задачи
    is_active!:      boolean; // флаг активности задачи, используется для удаления (помещения в архив), false - если задача удалена
    is_closed!:      boolean; // флаг закрытой задачи, true - если задача завершена
    comments!:       TaskComment[]|null; // комментарии к задаче { id: 1, text: "asdsa" , user: {тут_модель_пользователя}  }
}

export class TaskComment {
    idx!:       number;
    text!:      string;
    user!:      User;
    timestamp!: number;
}