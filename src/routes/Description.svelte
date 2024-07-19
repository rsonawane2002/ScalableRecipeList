<!-- Description.svelte -->
<script>
// @ts-nocheck

  
      let recipeDescription = '';
      export let show;
      export let recipeName;
      export let selectedType;
      export let addRecipe;
      
    
      async function saveDescription() {
      if (recipeDescription.trim() !== '') {
        const recipe = {
          name: recipeName,
          type: selectedType,
          description: recipeDescription,
        };
    
        addRecipe(recipe);
    
        const event = {
          type: 'recipeCreated',
          data: {
            recipeName,
            selectedType,
            recipeDescription,
          },
        };
    
        try {
          const response = await fetch('http://localhost:4005/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
          });

          if (response.ok) 
          {
            const text = await response.text();
            if(text.trim() === 'recipeRejected')
            {
                recipeDescription = "Error: this recipe was rejected";
                recipeDescription = recipeDescription
            }
            console.log('Event sent successfully to Event Bus', text);
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
      }
    }
    </script>
    
    <style>
        .save-button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            border: transparent;
            background-color: transparent;
            border-radius: 5px;
            transition: background-color 0.3s, color 0.3s, border-color 0.3s;
            cursor: pointer;
            }

        .save-button:hover {
            background-color: #3498db;
            color: #ffffff;
         }

        .save-button:active {
            transform: translateY(1px);
        }

        .description-textarea {
            padding: 10px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            transition: border-color 0.3s;
            font-size: 16px;
            font-family: Arial, sans-serif;
        }

        .description-textarea:focus {
            outline: none;
            border-color: #2980b9;
            border: 2px solid #3498db;
            /* Add any additional styles for focus state */
        }
    </style>
    
    {#if show}
      <div>
        <textarea bind:value={recipeDescription} placeholder="Enter recipe description" class="description-textarea"></textarea>
        <button on:click={saveDescription} class="save-button">Save</button>
      </div>
    {/if}
    