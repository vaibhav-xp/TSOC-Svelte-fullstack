<script lang="ts">
  import LoginForm from "$lib/LoginForm.svelte";

  export let form;
  $: isLoggedIn = form?.isLoggedIn || false;
  $: balance = form?.balance;
  $: message = form?.message;
  $: email = form?.email;
  $: password = form?.password;
  $: txid = form?.txid;

  const reset = () => {
    isLoggedIn = false;
    balance = "";
    email = "";
    message = "";
    password = "";
    txid = "";
  };
</script>

<h1 class="text-center font-bold text-2xl pt-10">
  Login to Wallet & Make Payment
</h1>

{#if isLoggedIn}
  <p class="text-center my-10">
    <button class="mx-auto bg-red-500 text-white py-2 px-4" on:click={reset}
      >Logout</button
    >
  </p>
  <p class="text-center text-2xl">
    <span class="text-pink-700 font-bold">Wallet Balance:</span>
    {balance}
  </p>
  {#if message}
    <p class="text-center text-red-500 pt-10">{message}</p>

    {#if txid}
      <a
        href={"https://whatsonchain.com/tx/" + txid}
        target="_blank"
        class="underline block text-center">{txid}</a
      >
    {/if}
    <p></p>
  {/if}

  <form
    class="max-w-[600px] w-full p-4 mx-auto my-10"
    method="POST"
    action="?/send-to-paymail"
  >
    <div class="flex flex-wrap gap-4 w-full mb-2">
      <input type="hidden" name="email" bind:value={email} />
      <input type="hidden" name="password" bind:value={password} />
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="paymail"
        >
          Pay Mail:
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="paymail"
          type="email"
          placeholder="Enter paymail"
          name="paymail"
          required
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="note"
        >
          Note:
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="note"
          type="text"
          placeholder="Enter note"
          name="note"
          required
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="amount"
        >
          Amount:
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="amount"
          type="number"
          placeholder="Enter amount"
          name="amount"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-yellow-500 hover:bg-blue-700 text-white font-bold w-full px-4 py-2 ml-2 rounded"
      >
        Send Payment
      </button>
    </div>
  </form>
{:else}
  <LoginForm />
{/if}
