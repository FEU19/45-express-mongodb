const { MongoClient, ObjectID } = require('mongodb')

const url = 'mongodb://localhost:27017';
const dbName = 'hatshop';
const collectionName = 'hats';


function getAllHats(callback) {
	get({}, callback)
}


function getHat(id, callback) {
	get({ _id: new ObjectID(id) }, array => callback( array[0] ))
}

function get(filter, callback) {
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('"ERROR!! Query error"');

			} finally {
				client.close();
			}


			// .toArray((error, docs) => {
			// 	// console.log('find filter=', filter, error, docs);
			// 	if( error ) {
			// 		callback('"ERROR!! Query error"');
			// 	} else {
			// 		callback(docs);
			// 	}
			// 	client.close();
			// })// toArray - async
		}// connect callback - async
	)//connect - async
}

function addHat(requestBody, callback) {
	// console.log('addHat', requestBody);
	const doc = requestBody
	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				// Wait for the resut of the query
				// If it fails, it will throw an error
				const result = await col.insertOne(doc);
				callback({
					result: result.result,
					ops: result.ops
				})

			} catch(error) {
				console.error('addHat error: ' + error.message);
				callback('"ERROR!! Query error"');

			} finally {
				client.close();
			}
		}// connect callback - async
	)//connect - async
}


function search(query, callback) {
	const filter = {};
	if( query.name ) {
		filter.name = { "$regex": `.*${query.name}.*`};
	}
	if( query.color ) {
		filter.color = query.color;
	}
	// { name: 'tophat', color: 'black' }

	MongoClient.connect(
		url,
		{ useUnifiedTopology: true },
		async (error, client) => {
			if( error ) {
				callback('"ERROR!! Could not connect"');
				return;  // exit the callback function
			}
			const col = client.db(dbName).collection(collectionName);
			try {
				const cursor = await col.find(filter);
				const array = await cursor.toArray()
				callback(array);

			} catch(error) {
				console.log('Query error: ' + error.message);
				callback('"ERROR!! Query error"');

			} finally {
				client.close();
			}
		}// connect callback - async
	)//connect - async
}




module.exports = {
	getAllHats, getHat, addHat, search
}
