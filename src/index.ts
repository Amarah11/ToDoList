import { EventEmitter } from "./components/base/Events";
import { Form } from "./components/Form";
import { Item } from "./components/Item";
import { Page } from "./components/Page";
import { ToDoApi } from "./components/ToDoApi";
import { ToDoModel } from "./components/ToDoModel";
import "./styles/styles.css"
import { todos } from "./utils/constants";
import { cloneTemplate } from "./utils/utils";

const events = new EventEmitter();

const toDoModel = new ToDoModel(events);

// Проверка работы модели данных
// toDoModel.setItems(todos)
// console.log(toDoModel)
// console.log(toDoModel.getItem(2))
// toDoModel.checkItem(1)
// console.log(toDoModel.getDone())

const api = new ToDoApi('https://jsonplaceholder.typicode.com');
const itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement
const page = new Page(document.querySelector('.page__content') as HTMLElement);
const form = new Form(document.querySelector('.todos__form') as HTMLElement, events);


api.getTasks()
    .then(data => {
        toDoModel.setItems(data)
        console.log(toDoModel)
    })
    .catch(err => console.log(err))

// Тестирование представления
    // const listElement = document.querySelector('.todos__list') as HTMLUListElement
    // const card1 = new Item(cloneTemplate(itemTemplate))

    // const obj1 = {
    //     name:'Сделать проектную работу',
    // completed: false,
    // }
    // listElement.append(card1.render(obj1))
 
    // card1.render({completed: true})

events.on('items:changed', () => {
    const itemsHTMLArray = toDoModel.getItems().map(item => new Item(cloneTemplate(itemTemplate), events).render(item))
    page.render({
        toDoList: itemsHTMLArray,
        tasksTotal: toDoModel.getTotal(),
        tasksDone: toDoModel.getDone()
    }
    )
})

events.on('item:check', ({id}: {id: number}) => {
    const {completed} = toDoModel.getItem(id)
    api.editTask(id, {completed: !completed})
    .then(res => {
        toDoModel.checkItem(id)
    })
    .catch(err => console.log(err))
    
})

events.on('item:delete', ({id}: {id: number}) => {
    api.deleteTask(id)
    .then(res => toDoModel.deleteItem(id))
    .catch(err => {
        console.error(err);
    });
})

events.on('item:copy', ({id}: {id: number}) => {
    const {title} = toDoModel.getItem(id)
    api.addTask({title, completed: false})
    .then(item => {
        toDoModel.addItem(item)
    })
    .catch(err => console.log(err))
    
})

events.on('form:submit', ({value}: {value: string}) => {
    api.addTask({title: value, completed: false})
    .then(item => {
        toDoModel.addItem(item)
        form.render({
            value: ''})
    })
    .catch(err => console.log(err))
    
})