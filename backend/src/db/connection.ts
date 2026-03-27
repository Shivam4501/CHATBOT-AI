import {connect, disconnect} from 'mongoose';

async function connectToDatabase() {

try {
    await connect(process.env.MONGODB_URL);
} catch (error) {
    console.log(error);
    throw new Error('Failed to connect to the MONGODB');
}
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error('Failed to disconnect from the MONGODB');
    }
}

export {connectToDatabase, disconnectFromDatabase};