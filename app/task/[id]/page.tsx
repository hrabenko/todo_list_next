'use client';
import styles from './page.module.css';

// @ts-ignore
export default function TaskDetails({ params } ) {
    let taskList = [];

    if (typeof window !== 'undefined') {
        // @ts-ignore
        taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    }

    const currentTask = taskList.find((task: any) => task.id === String(params.id));

    return (
        <div className={styles.main}>
            {currentTask ? (
                <div>
                    <a className={styles.button} href='/'>Back</a>
                    <h1>{currentTask.title}</h1>
                    <div className={styles.content}>
                        <p>{currentTask.description}</p>
                        <hr />
                        <p><b>Status:</b> {currentTask.isDone ? "Complete" : "Not complete"}</p>
                    </div>

                </div>
            ) : (
                <h1>Task not found</h1>
            )}
        </div>
    );
}
