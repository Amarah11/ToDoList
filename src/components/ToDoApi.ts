import { IToDoItem } from "../types";
import { Api } from "./base/Api";

// interface IToDoServer extends IToDoItem
//     {
//         "userId": number,
//       }

export class ToDoApi extends Api {

getTasks(): Promise<IToDoItem[]> {
    return this.get<IToDoItem[]>('/todos');
}

deleteTask(id: number): Promise<IToDoItem> {
    return this.post<IToDoItem>(`/todos/${id}`, {_id: id}, 'DELETE')
}

editTask(id: number, data: Partial<IToDoItem>): Promise<IToDoItem> {
    return this.post<IToDoItem>(`/todos/${id}`, data,  'PATCH')
}

addTask(data: Partial<IToDoItem>): Promise<IToDoItem> {
    return this.post<IToDoItem>('/todos', data);
}
}