import express from 'express';
import cors from 'cors';

// Create an Express app
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const bannedListName = ['Roast beef']

// Route to handle incoming events
app.post('/events', async (req, res) => {

    const event = req.body;
    if (event.type === 'recipeCreated')
    {
        const { recipeName, selectedType, recipeDescription } = event.data;

        // Log the event type received from the event bus
        console.log(`Received Event: ${recipeName}`);

        let eventType = 'recipeApproved';
        if(bannedListName.includes(recipeName))
        {
            eventType = 'recipeRejected';
        }
        
        const sendEvent = {
            type: eventType,
            data: {
            recipeName,
            selectedType,
            recipeDescription,
            },
        };
        
        /*
        try 
        {
            const response = await fetch('http://localhost:4005/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendEvent),
            });
    
            if (response.ok) 
            {
            console.log('Event sent successfully to Event Bus');
            }
            else
            {
            console.error('Failed to send event to Event Bus');
            }
        } 
        catch (error) 
        {
            console.error('Error sending event to Event Bus:', error);
        }
        */
    
        res.send(eventType);
    }
});


app.listen(PORT, () => {
  console.log(`Microservice listening on port ${PORT}`);
});
