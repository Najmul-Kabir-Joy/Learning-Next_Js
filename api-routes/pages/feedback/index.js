import { Fragment, useState } from 'react';
import { buildFedbackPath, extractFedback } from '../api/feedback';
const FeedBackPage = (props) => {
    const [feedback, setFeedback] = useState({});
    const loadFeedback = (id) => {
        fetch(`/api/feedback/${id}`)
            .then(res => res.json())
            .then(data => setFeedback(data.feedback))
    }
    return (
        <Fragment>
            {feedback && <p>{feedback.email}</p>}
            <ul>
                {props.items.map(item =>
                    <Fragment key={item.id}>
                        <li>{item.msg}</li>
                        <button
                            onClick={() => loadFeedback(item.id)}>FEEDBACK</button>
                        {/* <button
                        onClick={loadFeedback.bind(null, item.id)}>FEEDBACK</button> */}
                    </Fragment>
                )
                }
            </ul>
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const filePath = buildFedbackPath();
    const data = extractFedback(filePath);
    return {
        props: {
            items: data
        }
    }
}

export default FeedBackPage;