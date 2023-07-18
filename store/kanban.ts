import _ from 'lodash';
import { defineStore } from 'pinia';
import {useApi} from "~/helpers";
import {Chat, User} from "~/dto/chat";
import {Board, BoardCreateRequest, Task, TaskCreateRequest} from "~/dto/task";


export const useKanbanStore = defineStore('kanbanStore', () => {
    const { loading: loadingBoardCreate, data: boardIdCreate, fetchData: addBoard} = useApi<BoardCreateRequest>('/tasks/board/create');
    const { loading: loadingBoardList, data: boardList, fetchData: getBoardList} = useApi<Board[]>('/tasks/board/list');

    const { loading: loadingGroupCreate, fetchData: addGroup} = useApi('/tasks/group/create');

    const { loading: loadingTaskCreate, data: taskIdCreate, fetchData: addTask} = useApi<TaskCreateRequest>('/tasks/task/create');

    return {
        // Доски
        // Создать
        loadingBoardCreate,
        addBoard: async (board: BoardCreateRequest) => await addBoard({method: 'post', params: {...board}}),
        // Список
        loadingBoardList,
        boardList,
        getBoardList,
        getBoardById: (id: number):Board => _.find(boardList.value, {id}),

        // Группы
        loadingGroupCreate,
        addGroup: async (group: { border_id: number, title: string }) => await addGroup({method: 'post', params: {...group}}),
        // Задачи
        loadingTaskCreate,
        addTask: async (task: TaskCreateRequest) => await addTask({method: 'post', params: {...task}}),
        addObserversToTask: (task: Task, observer: User ) => {
            const board = _.find(boardList.value, {id: task.border_id});
            const group = _.find(board?.groups, {id: task.group_id});
            const taskLocal = _.find(group?.tasks, {id: task.id});
            if (taskLocal) {
                if (taskLocal.observers == null) taskLocal.observers = [];
                taskLocal.observers.push(observer)
            }
        },
    }
});