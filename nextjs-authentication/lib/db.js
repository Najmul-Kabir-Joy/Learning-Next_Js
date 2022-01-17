import { MongoClient } from "mongodb";

export const connectDB = async () => {
    const client = await MongoClient.connect('mongodb+srv://nextAuth:uS5ulFqx2f7qh7Lc@cluster0.9qiyn.mongodb.net/nextAuthPractice?retryWrites=true&w=majority');

    return client;
}