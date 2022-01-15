import { dbConnect, dataInsertion } from '../../helpers/db-utils';
const handler = async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }
        let client;
        try {
            client = await dbConnect();
        } catch (error) {
            return res.status(500).json({ message: 'db connection failed' })
        }

        try {
            await dataInsertion(client, 'emails', { email })
            // client.close();
        } catch (error) {
            return res.status(500).json({ message: 'insertion failed' })

        }





        res.status(201).json({ message: 'Registered' })
    }
}

export default handler;