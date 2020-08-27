const { MongoClient, ObjectID } = require('mongodb')

const url = 'mongodb://localhost:27017';
const dbName = 'hatshop';
const collectionName = 'hats';


function getAllHats(callback) {
	get({}, callback)
}


function getHat(id, callback) {
	get({ _id: new ObjectID(id) }, callback)
}

function get(filter, callback) {
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		(error, client) => {
			if( error ) {
				callback('ERROR!! Could not connect');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			col.find(filter).toArray((error, docs) => {
				// console.log('find filter=', filter, error, docs);
				if( error ) {
					callback('ERROR!! Query error');
				} else {
					callback(docs);
				}
				client.close();
			})// toArray - async
		}// connect callback - async
	)//connect - async
}

function addHat(requestBody, callback) {
	console.log('addHat', requestBody);
	const doc = { name: 'cap', color: 'red', price: 200 }
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		(error, client) => {
			if( error ) {
				callback('ERROR!! Could not connect');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			col.insertOne(doc, (error, result) => {
				if( error ) {
					callback('ERROR!! Query error');
				} else {
					callback(result);
				}
				client.close();
			})// insertOne - async
		}// connect callback - async
	)//connect - async
	callback('addHat')
}






module.exports = {
	getAllHats, getHat, addHat
}
