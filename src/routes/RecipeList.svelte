

<script>
    // @ts-nocheck
    
        export let recipes = [];
      
        function addRecipe(recipe) {
          recipes = [...recipes, recipe];
        }

        async function saveRecipes(name, type, description)
        {
          const url = 'http://localhost:5000/save-data';
            try {
              const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ name, type, description })
              });

              if (response.ok) {
                  // If the request was successful, show the type
                  showType = true;
              } else {
                  // Handle the error response
                  console.error('Error:', response.statusText);
              }
          } 
          catch (error) {
              // Handle network errors
              console.error('Error:', error);
          }

        }

</script>

<style>
    .edit-button {
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

    .edit-button:hover {
    background-color: #3498db;
    color: #ffffff;
    }

    .edit-button:active {
    transform: translateY(1px);
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px; /* Adjust padding as needed */
    }
</style>
      
      <div class = 'container'>
        <ul>
          {#each recipes as recipe}
            <li>
              <strong>Name:</strong> {recipe.name}<br>
              <strong>Type:</strong> {recipe.type}<br>
              <strong>Description:</strong> {recipe.description}
              <br>
              <button on:click={saveRecipes(recipe.name, recipe.type, recipe.description)} class = "edit-button">Save</button>
            </li>
          {/each}
        </ul>
      </div>
      