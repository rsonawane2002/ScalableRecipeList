import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());

const port = 5000;

app.post('/save-data', async(req, res) => {
    try 
    {
        // Connect to MongoDB
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Access the database
        const db = client.db('Main');

        // Access the collection
        const collection = db.collection('Recipes');

        // Save req.body to MongoDB
        const result = await collection.insertOne(req.body);

        console.log('Data saved:', result);

        // Close the connection
        await client.close();

        res.status(200).send('Data saved to MongoDB');
    } 
    catch (error) 
    {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data to MongoDB');
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
