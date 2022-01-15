import { useEffect, useState } from 'react';
import CommnetList from './comment-list';
import styles from './comments.module.css';
import NewComment from './new-comment';
const Comments = (props) => {
    const { eventId } = props;
    const [showComments, setShowComments] = useState(false);
    const [comments, setCommnets] = useState([]);
    useEffect(() => {
        if (showComments) {
            fetch(`/api/comments/${eventId}`)
                .then(res => res.json())
                .then(data => setCommnets(data.comments))
        }
    }, [showComments, eventId])
    const toggleCommentsHandler = () => {
        setShowComments(prev => !prev)
    }
    const addCommentHandler = (commentData) => {
        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommnetList items={comments} />}

        </section>

    );
};

export default Comments;