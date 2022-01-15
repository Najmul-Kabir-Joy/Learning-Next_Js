import { MongoClient } from 'mongodb';
export const dbConnect = async () => {
    const client = await MongoClient.connect(
        'mongodb+srv://user:0MBKZKTqhlPzJxKi@cluster0.9qiyn.mongodb.net/practiceTime?retryWrites=true&w=majority');
    return client;
}

export const dataInsertion = async (client, collection, document) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export const getAllDocuments = async (client, collection, sort, filter = {}) => {
    const db = client.db();
    const result = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray();
    return result;
}