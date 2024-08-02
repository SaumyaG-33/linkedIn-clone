import { connect } from 'http2';
import mongoose from 'mongoose';
import mongose from 'mongoose';

//const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@clone-for-linkedin.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

const connectionString = `mongodb+srv://saumyag335:Purdue2027@clone-for-linkedin.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;
if (!connectionString) {
    throw new Error('Please provid a valid connection string');

}

const connectDB = async () => {
    if(mongoose.connection?.readyState >= 1) {
       // already connected
        return;
    }

try {
    console.log('connecting to database');
    await mongoose.connect(connectionString);
    } catch (error) {
        console.log('error connecting to MongoDB: ', error);
    }
};

export default connectDB;

