import { MongoClient } from 'mongodb';
const handler = async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }

        const client = await MongoClient.connect(
            'mongodb+srv://user:0MBKZKTqhlPzJxKi@cluster0.9qiyn.mongodb.net/practiceTime?retryWrites=true&w=majority');
        const db = client.db();
        await db.collection('emails').insertOne({ email: email });
        client.close();

        res.status(201).json({ message: 'Registered' })
    }
}

export default handler;