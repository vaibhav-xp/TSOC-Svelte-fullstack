<script>
  // @ts-nocheck
  export let form;

  $: console.log(form);
</script>

<h1 class="text-center font-bold text-2xl pt-10">
  Let's Deploy Contract & Unlock
</h1>
<form
  class="max-w-[500px] w-full p-4 my-10 mx-auto"
  method="POST"
  action="?/lock"
>
  <h2 class="text-center mb-4 font-bold text-pink-700 underline">
    Lock Script
  </h2>
  <div class="flex w-full mb-2">
    <div class="w-full px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="amount"
      >
        Amount
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="amount"
        type="number"
        placeholder="Enter amount"
        name="amount"
      />
    </div>
    <div class="w-full px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="square"
      >
        Square
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="square"
        type="number"
        placeholder="Enter square"
        name="square"
      />
    </div>
    <button
      type="submit"
      class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 px-4 ml-2 rounded"
    >
      Deploy
    </button>
  </div>
  {#if form?.status && form?.status === "locked"}
    <p class="text-center py-4">
      Contract Deployed Successfully. <a
        href={"https://whatsonchain.com/tx/" + form.data.tx_id}
        class="underline text-red-500"
        target="_blank">Transaction Link!</a
      >
    </p>
  {/if}
</form>

{#if form?.status && (form?.status === "locked" || form?.status === "unlocked")}
  <form
    class="max-w-[500px] w-full p-4 my-10 mx-auto"
    method="POST"
    action="?/unlock"
  >
    <h2 class="text-center mb-4 font-bold text-green-700 underline">
      Unlock Script
    </h2>
    <div class="flex w-full mb-2">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="root"
        >
          Root No.
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="root"
          type="number"
          placeholder="Enter root"
          name="root"
        />
      </div>
      <button
        type="submit"
        class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 px-4 ml-2 rounded"
      >
        Deploy
      </button>
    </div>
    {#if form?.status && form?.status === "unlocked" && form?.data?.tx_id !== null}
      <p class="text-center py-4">
        Contract Unlocked Successfully. <a
          href={"https://whatsonchain.com/tx/" + form.data.tx_id}
          class="underline text-red-500"
          target="_blank">Transaction Link!</a
        >
      </p>
    {/if}
    {#if form?.status && form?.status === "unlocked" && form?.data?.tx_id === null}
      <p class="text-center py-4">Execution failed, incorrect square-root</p>
    {/if}
  </form>
{/if}
