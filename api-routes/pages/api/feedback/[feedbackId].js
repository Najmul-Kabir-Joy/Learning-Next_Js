import { buildFedbackPath, extractFedback } from "./index";
const FeedBackDetails = (req, res) => {
    if (req.method === 'POST') {

    }
    const feedbackId = req.query.feedbackId;
    const filePath = buildFedbackPath();
    const feedbackData = extractFedback(filePath);
    const singleItem = feedbackData.find(
        feedback => feedback.id === feedbackId
    )
    res.status(200).json({ feedback: singleItem })
};

export default FeedBackDetails;