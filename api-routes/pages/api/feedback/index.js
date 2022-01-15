import fs from 'fs';
import path from 'path'

export const buildFedbackPath = () => {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export const extractFedback = (filePath) => {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData);
    return data;
}

const handler = (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            msg: feedbackText,
        };

        //STORE NEW FEED BACK IN DB/FILE
        const filePath = buildFedbackPath();
        const data = extractFedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: 'Successfull', feedback: newFeedback });
    } else {
        const filePath = buildFedbackPath();
        const data = extractFedback(filePath);
        res.status(200).json({ feedback: data });
    }
}

export default handler;