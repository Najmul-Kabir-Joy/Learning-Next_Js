import { getSession } from "next-auth/client";
import { connectDB } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";
const handler = async (req, res) => {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({
        req: req
    });


    if (!session) {
        res.status(401).json({ message: 'not authenticated' });
        return;
    }


    const userEmail = session.user.email;
    const oldPassword = req.body.passData.oldPassword;
    const newPassword = req.body.passData.newPassword;

    const client = await connectDB();

    const userCollection = client.db().collection('users');
    const user = await userCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(404).json({ message: 'user not found' })
        client.close();
        return;
    }
    const currentPassword = user.password;

    const passConfirmed = await verifyPassword(oldPassword, currentPassword);

    if (!passConfirmed) {
        res.status(403).json({ message: 'Invalid old password' });
        client.close();
        return;
    }

    const hashedPass = await hashPassword(newPassword);

    const result = await userCollection.updateOne({ email: userEmail }, { $set: { password: hashedPass } });

    client.close();

    res.status(200).json({ message: 'Password updated' });


}
export default handler;