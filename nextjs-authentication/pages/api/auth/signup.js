import { hashPassword } from "../../../lib/auth";
import { connectDB } from "../../../lib/db"

const handler = async (req, res) => {
    const data = req.body;

    const { email, password } = data;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 6
    ) {
        res.status(422).json({ message: 'Invalid input - password should also be at least 6 characters long.' });
        return;
    }

    const client = await connectDB();

    const db = client.db();

    const hashedPass = hashPassword(password);

    const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPass
    });

    res.status(201).json({ message: 'Created user' });
}

export default handler