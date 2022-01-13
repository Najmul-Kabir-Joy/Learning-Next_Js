import { buildFedbackPath, extractFedback } from '../api/fedback';
const FeedBackPage = (props) => {
    return (
        <ul>
            {props.items.map(item =>
                <li key={item.id}>{item.email}, {item.msg}</li>)
            }
        </ul>
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