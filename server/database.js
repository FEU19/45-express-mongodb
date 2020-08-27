const { MongoClient/*, ObjectID*/ } = require('mongodb')

const url = 'mongodb://localhost:27017';
const dbName = 'hatshop';
const collectionName = 'hats';


function getAllHats(callback) {
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		(error, client) => {
			if( error ) {
				callback('ERROR!! Could not connect');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			col.find().toArray((error, docs) => {
				if( error ) {
					console.log('Query error: ', error.message);
					callback('ERROR!! Query error');
				} else {
					callback(docs);
				}
				client.close();
			})// toArray - async
		}// connect callback - async
	)//connect - async
}

module.exports = {
	getAllHats
}
