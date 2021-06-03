export type Int = number & { __int__: void };

export enum State {
    New = 0,
    Doing = 1,
    Done = 2
}

export interface ITodoItem {
    id: Int,
    state: Int,
    assignee: string,
    text: string,
    deadline: string
}