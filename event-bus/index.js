import express from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

//modify for services
const servicePorts = [4000];

app.post('/events', async (req, res) => {
  const event = req.body;

  console.log(`(${process.pid}) Event Bus (Received Event) ${event.type}`);
  let text = 'OK';

  for (const port of servicePorts) {
    try {
      console.log(
        `(${process.pid}) Event Bus (Sending Event to ${port}) ${event.type}`
      );

      const response = await fetch(`http://localhost:${port}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
      });
      text = await response.text();
    } catch (err) {
      console.log(err);
    }
  }

  res.send(text);
});

app.listen(4005, () => {
  console.log(`(${process.pid}) Event Bus Listening on 4005`);
});
