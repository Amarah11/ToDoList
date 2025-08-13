import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface IPage {
    toDoList: HTMLElement[];
    tasksTotal: number;
    tasksDone: number;
}

export class Page extends Component<IPage> {
    protected toDoContaner: HTMLElement;
    protected elementTotal: HTMLElement;
    protected elementDone: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.toDoContaner = ensureElement('.todos__list', this.container);
        this.elementTotal = ensureElement('.todos__total', this.container);
        this.elementDone = ensureElement('.todos__done', this.container);
    }

    set toDoList(items: HTMLElement[]){
        this.toDoContaner.replaceChildren(...items);
    }

    set tasksTotal(value: number) {
        this.setText(this.elementTotal, `Всего дел: ${value}`);
    }

    set tasksDone(value: number) {
        this.setText(this.elementDone, `Выполнено: ${value}`);
    }
}