import { useContext, useEffect, useState } from 'react';
import NotificationContext from '../../store/notification-context';
import CommnetList from './comment-list';
import styles from './comments.module.css';
import NewComment from './new-comment';
const Comments = (props) => {
    const notificationCtx = useContext(NotificationContext);
    const { eventId } = props;
    const [showComments, setShowComments] = useState(false);
    const [comments, setCommnets] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    useEffect(() => {
        if (showComments) {
            setIsloading(true);
            fetch(`/api/comments/${eventId}`)
                .then(res => res.json())
                .then(data => {
                    setCommnets(data.comments);
                    setIsloading(false);
                })
        }
    }, [showComments, eventId])
    const toggleCommentsHandler = () => {
        setShowComments(prev => !prev)
    }
    const addCommentHandler = (commentData) => {
        notificationCtx.showNotification({
            title: "Posting...",
            message: "Posting your comment",
            status: 'pending'
        })
        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                res.json().then(data => {
                    throw new Error(data.message || 'Something went wrong')
                })
            })
            .then(data => {
                notificationCtx.showNotification({
                    title: "Succesfull",
                    message: "Your comment posted",
                    status: 'success'
                })
            })
            .catch(error => {
                notificationCtx.showNotification({
                    title: "Failed",
                    message: error.message || 'Something went wrong',
                    status: 'error'
                })
            })
    }
    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommnetList items={comments} isLoading={isLoading} />}

        </section>

    );
};

export default Comments;