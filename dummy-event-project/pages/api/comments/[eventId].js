import { MongoClient } from "mongodb";
import { dbConnect, getAllDocuments, dataInsertion } from "../../../helpers/db-utils";
const handler = async (req, res) => {
    const eventId = req.query.eventId;
    let client;
    try {
        client = await dbConnect();
    } catch (error) {
        client.close();
        return res.status(500).json({ message: 'DB connection failed' });
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'invalid input' })
            return;
        }

        const newCommnet = {
            email,
            name,
            text,
            eventId
        }

        try {
            const result = dataInsertion(client, 'comments', newCommnet);
            newCommnet.id = result.insertedId;
            res.status(201).json({ message: 'Added comment', comment: newCommnet })
        } catch (error) {
            return res.status(500).json({ message: "Data insertion failed" })
        }

    }

    //-----------
    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId: eventId });
            res.status(200).json({ comments: documents });
        } catch (error) {
            return;
        }
    }
    // client.close();

}

export default handler;