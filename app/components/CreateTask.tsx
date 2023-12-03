import styles from '../page.module.css'
import React from "react";


export default function CreateTask(props: { taskTitle: string, setTaskTitle: any, taskDescription: string, setTaskDescription: any, buttonHandler: any }) {
    return (
        <div className={styles.create}>
            <h2>Creating task</h2>
            <input type="text" placeholder="Enter your task..." value={props.taskTitle} onChange={props.setTaskTitle}/>
            <textarea className={styles.task_description} value={props.taskDescription}
                      placeholder="Enter description..."
                      onChange={props.setTaskDescription}></textarea>
            <button className={styles.createButton} onClick={props.buttonHandler}>Create task</button>
        </div>
    )
}
