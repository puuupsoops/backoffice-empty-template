import {Task} from "~/dto/task/task";

export class Group {
    id!:      number;
    order!:   number;
    title!:   string;
    tasks!:   Task[]|null;
}