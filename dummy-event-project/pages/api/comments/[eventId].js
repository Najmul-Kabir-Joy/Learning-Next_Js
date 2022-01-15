import { MongoClient } from "mongodb";
const handler = async (req, res) => {
    const eventId = req.query.eventId;

    const client = await MongoClient.connect(
        'mongodb+srv://user:0MBKZKTqhlPzJxKi@cluster0.9qiyn.mongodb.net/practiceTime?retryWrites=true&w=majority');


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

        const db = client.db();
        const result = await db.collection('comments').insertOne(newCommnet);
        console.log(result);
        newCommnet.id = result.insertedId;
        res.status(201).json({ message: 'Added comment', comment: newCommnet })

    }
    if (req.method === 'GET') {
        const db = client.db();
        const documents = await db
            .collection('comments')
            .find({ eventId: eventId })
            .sort({ _id: -1 })
            .toArray();
        // const dummyList = [
        //     { id: 'c1', name: 'mate', email: 'mate@mail.com', text: "talabo talbo" },
        //     { id: 'c2', name: 'nata', email: 'nata@mail.com', text: "ye jism hein to kya" },
        // ];
        res.status(200).json({ comments: documents });
    }
    client.close();

}

export default handler;