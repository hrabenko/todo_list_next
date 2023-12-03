import styles from '../page.module.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export default function Task(props: { id: string, title: string, isDone: boolean, changeComplete: any, trashClick: any }) {
    return (
        <div className={styles.task}>
            <input onChange={() => props.changeComplete(props.id)} type="checkbox"/>
            <p className={props.isDone ? styles.strikeThrough : undefined}>{props.title}</p>
            <FontAwesomeIcon onClick={() => props.trashClick(props.id)} className={styles.trashIcon} icon={faTrash}/>
            <a href={`/task/${props.id}`}  className={styles.button}>
                More...
            </a>
        </div>
    )
}
