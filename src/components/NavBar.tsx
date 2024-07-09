export default function NavBar() {
  return (
    <nav className=" py-3 bg-black-200 shadow-lg">
      <div className="container flex justify-between capitalize items-center">
        <h2 className=" font-bold">created by moustafa</h2>
        <a
          href="/login"
          className="block bg-blue-200 px-3 py-2 rounded-lg hover:bg-blue-300 transition-colors duration-300"
        >
          login
        </a>
      </div>
    </nav>
  );
}
