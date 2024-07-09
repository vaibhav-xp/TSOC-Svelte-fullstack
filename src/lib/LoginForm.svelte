<form
  class="max-w-[500px] w-full p-4 my-10 mx-auto"
  method="POST"
  action="?/login"
>
  <div class="flex w-full mb-2">
    <div class="w-full px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="email"
      >
        Name
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="email"
        type="email"
        placeholder="Enter email"
        name="email"
        value="sales@timechainlabs.io"
      />
    </div>
    <div class="w-full px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="password"
      >
        Password
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="password"
        type="password"
        placeholder="Enter password"
        name="password"
        value="string"
      />
    </div>
    <button
      type="submit"
      class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 px-4 ml-2 rounded"
    >
      Login
    </button>
  </div>
</form>
