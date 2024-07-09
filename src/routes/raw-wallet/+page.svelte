<script>
  import { PrivateKey } from "@bsv/sdk";

  let WIF = "";
  let address = "";
  const generatePrivateKey = () => {
    const privateKey = PrivateKey.fromRandom();
    WIF = privateKey.toWif();
    address = privateKey.toAddress();
  };
</script>

<section class="text-center py-4">
  <button
    class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={generatePrivateKey}>Generating Private Key</button
  >
  {#if WIF && address}
    <div class="py-4">
      <p><span class="font-bold">Private key wif formate is:</span> {WIF}</p>
      <p><span class="font-bold">Your Bitcoin address is:</span>{address}</p>
    </div>
  {/if}
</section>
