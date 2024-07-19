<!-- Type.svelte -->

<script>
    // @ts-nocheck
        import { writable } from 'svelte/store';
        import Description from './Description.svelte';
        import RecipeList from './RecipeList.svelte';
      
        let selectedType = '';
        let showDescription = false;
        const types = ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Other'];
        let recipes = [];

        const recipeNameStore = writable('');
        const selectedTypeStore = writable('');

        /*
        $recipeNameStore.subscribe(value => {
          recipeName = value;
        });

        $selectedTypeStore.subscribe(value => {
          selectedType = value;
        });
        */
      
        export let show;
        export let recipeName;
      
        function confirmType() {
          if (selectedType !== '') {
            showDescription = true;
          }
        }
      
        function handleSelect(event) {
          selectedType = event.target.value;
          selectedTypeStore.set(selectedType);
        }
      
        function addRecipeToList(recipe) {
          recipes = [...recipes, recipe];
        }
</script>

<style>

    .confirm-button {
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

    .confirm-button:hover {
    background-color: #3498db;
    color: #ffffff;
    }

    .confirm-button:active {
    transform: translateY(1px);
    }
    
    .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px; /* Adjust padding as needed */
  }

    .dropdown2 {
        padding: 10px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: #fff; /* Customize dropdown background color */
        transition: border-color 0.3s, color 0.3s, background-color 0.3s;
    }


    .dropdown2 :hover,
    .dropdown2 :focus {
        background-color: #3498db;
        color: #fff;
        /* Add any additional styles for hover or focus state */
    }

</style>
      
      {#if show}
        <div class="dropdown">
          <select on:change={handleSelect} class = "dropdown2">
            <option value="">Select a type</option>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
          <button on:click={confirmType} class="confirm-button">Confirm</button>
          {#if showDescription}
            <br>
            <div class = "container">
              <label>{recipeName} - Selected Type: {selectedType}</label>
            </div>
            <div class = "container">
                <Description show={showDescription} recipeName={recipeName} selectedType={selectedType} addRecipe={addRecipeToList} />
            </div>
            <RecipeList bind:recipes={recipes} />
          {/if}
        </div>
      {/if}
      