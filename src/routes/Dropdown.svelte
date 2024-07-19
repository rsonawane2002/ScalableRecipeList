<script>
    import Type from './Type.svelte';
  
    let recipeName = '';
    let showType = false;
  
    function addRecipe() {
      if (recipeName.trim() !== '') {
        showType = true;
      }
    }
  </script>

<style>
    .add-button {
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

    .add-button:hover {
    background-color: #3498db;
    color: #ffffff;
    }

    .add-button:active {
    transform: translateY(1px);
    }

    .textbox {
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    transition: border-color 0.3s;
  }

  .textbox:focus {
    outline: none;
    border-color: #2980b9;
    border: 2px solid #3498db;
    
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px; 
  }
</style>
  
  <div>
    <input type="text" bind:value={recipeName} placeholder="Enter recipe name" class="textbox">
    <button on:click={addRecipe} class="add-button">Add Recipe</button>
    {#if showType}
    <div class = 'container'>
      <Type show={showType} recipeName={recipeName} />
    </div>
    {/if}
  </div>
  