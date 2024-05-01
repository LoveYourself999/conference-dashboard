const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-4 py-2">
        <div className="flex-grow">
          <input
            type="text"
            className="w-3/4 bg-grey text-black px-4 py-2 rounded-md"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center"></div>
      </nav>
    </>
  );
};

export default Navbar;