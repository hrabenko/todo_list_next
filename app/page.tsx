'use client'

import styles from './page.module.css'
import Task from './components/Task'
import {nanoid} from 'nanoid';

import React, {useState, useEffect} from 'react';
import CreateTask from "@/app/components/CreateTask";

export default function Home() {
    interface Task {
        id: string,
        title: string,
        description: string,
        isDone: boolean,
    }


    // @ts-ignore
    const [taskList, setTaskList] = useState<Task[]>(JSON.parse(localStorage.getItem("taskList")) || []);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.removeItem('taskList');
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    const changeTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTaskTitle(e.target.value);
    }

    const changeDescription = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTaskDescription(e.target.value);
    }

    const changeSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(e.target.value);
    }

    const filterTasks = () => {
        return taskList.filter(
            (task) =>
                task.title.toLowerCase().includes(search.toLowerCase())
        );
    };

    const buttonHandler = () => {
        const trimmedValue = taskTitle.trim();
        if (trimmedValue) {
            setTaskList(prevTaskList => [
                ...prevTaskList,
                {
                    id: nanoid(),
                    title: taskTitle,
                    description: taskDescription,
                    isDone: false,
                }
            ]);
            setTaskTitle("");
            setTaskDescription("");
        }
    };

    const changeComplete = (currentId: number) => {
        setTaskList((prevState) =>
            prevState.map((prevNote) =>
                String(prevNote.id) === String(currentId)
                    ? {...prevNote, isDone: !prevNote.isDone}
                    : prevNote
            )
        );
    };

    const trashClick = (currentId: number) => {
        setTaskList((prevState) => {
            let newTaskList = [];
            for (let i = 0; i < prevState.length; i++) {
                if (String(prevState[i].id) !== String(currentId)) {
                    newTaskList.push(prevState[i]);
                }
            }
            return newTaskList;
        });
    }


    return (
        <main className={styles.main}>
            <h1>To-Do List</h1>
            <CreateTask taskTitle={taskTitle} setTaskTitle={changeTitle} taskDescription={taskDescription}
                        setTaskDescription={changeDescription}
                        buttonHandler={buttonHandler}/>

            <div className={styles.searching}>
                <label htmlFor="search"><h3>Search: </h3></label>
                <input id="search" onChange={changeSearch}/>
            </div>


            {taskList.length > 0 ? (
                <div>
                    {filterTasks().map((task) => (
                        <Task
                            id={task.id}
                            key={task.id}
                            title={task.title}
                            isDone={task.isDone}
                            changeComplete={changeComplete}
                            trashClick={trashClick}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <h3>There are no tasks</h3>
                </div>
            )}
        </main>
    )
}
