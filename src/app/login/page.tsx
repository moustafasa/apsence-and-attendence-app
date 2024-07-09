export default function page() {
  return (
    <div className="container mt-28">
      <form
        action=""
        className="max-w-[700px] w-full mx-auto bg-black-200 p-4 rounded-lg shadow-lg"
      >
        <h2 className="text-center text-4xl capitalize mb-6">log in</h2>
        <div className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            className="p-3 rounded-lg bg-black-400 placeholder:capitalize  horder-none outline-none focus:ring-1 focus:ring-blue-300  transition-shadow duration-300"
            placeholder="write your username"
          />
          <input
            type="password"
            className="p-3 rounded-lg bg-black-400 placeholder:capitalize  horder-none outline-none focus:ring-1 focus:ring-blue-300  transition-shadow duration-300"
            placeholder="write your password"
          />
        </div>
        <button
          type="submit"
          className="block capitalize w-fit mx-auto bg-blue-200 px-3 py-2 rounded-lg text-xl hover:bg-blue-300 transition-colors duration-300 shadow-lg"
        >
          login
        </button>
      </form>
    </div>
  );
}
