<script>
  import { age, gender, value } from "./stores.js";
  export let name;
  export let gender_options = [
    { value: "F", text: "Female" },
    { value: "M", text: "Male" },
    { value: "D", text: "Divers" },
  ];
</script>

<main>
  <h1>Hello {name}!</h1>
  <h2>Age</h2>
  <label>
    <input type="number" bind:value={$age} min="18" max="99" />
    <input type="range" bind:value={$age} min="18" max="99" />
  </label>

  <h2>Gender</h2>
  {#each gender_options as { value, text }, idx}
    <label>
      <input
        type="radio"
        id={idx}
        {value}
        required="true"
        bind:group={$gender}
      />
      <span>{text}</span>
    </label>
  {/each}

  <h1>Age: {$age}</h1>
  <h1>Gender: {$gender}</h1>
  <h1>Value: {$value}</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
