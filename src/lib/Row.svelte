<script>
  export let user;
  let wantToUpdate = false;
  let updateName = "";
  let updateEmail = "";
  let updateId = "";
</script>

<div class="flex items-center justify-between py-3">
  {#if wantToUpdate}
    <form
      class="flex items-center gap-2"
      method="POST"
      action="/profiles?/update"
    >
      <div class="flex gap-2">
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="name"
          type="text"
          placeholder="Enter name"
          name="name"
          bind:value={updateName}
        />
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="email"
          type="email"
          placeholder="Enter email"
          name="email"
          bind:value={updateEmail}
        />
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="id"
          type="hidden"
          placeholder="Enter email"
          name="id"
          bind:value={updateId}
        />
      </div>

      <button
        type="submit"
        class="bg-yellow-500 hover:bg-blue-700 text-white font-bold rounded p-2"
      >
        Update
      </button>
    </form>
  {:else}
    <div class="flex items-center space-x-4">
      <div class="flex">
        <p class="font-medium pt-1 leading-none">{user.name}</p>
        <p class="font-medium pl-5 text-gray-500 pt-0">{user.email}</p>
      </div>
    </div>
    <form method="POST" action="/profiles?/delete">
      <input type="hidden" name="id" id="id" value={user.id} />
      <button
        on:click={() => {
          updateName = user.name;
          updateEmail = user.email;
          wantToUpdate = !wantToUpdate;
          updateId = user.id;
        }}
      >
        <img
          class="w-4 float-right cursor-pointer"
          src="./edit.png"
          alt="update"
        />
      </button>
      <button type="submit">
        <img class="w-4 float-right" src="./trash-can.svg" alt="delete" />
      </button>
    </form>
  {/if}
</div>
