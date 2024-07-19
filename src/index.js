import express from 'express';
import cors  from 'cors';


const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON
app.use(express.json());
app.use(cors());

// Endpoint to receive events
app.post('/events', (req, res) => {
  const event = req.body; 
  console.log('Received event:', event);

  res.send({ status: 'Event received' });
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});