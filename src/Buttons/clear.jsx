
const Clear = ({ clear }) => {
  return (
    <button
      onClick={clear}
      className= "bg-blue-500 hover:bg-blue-600 text-white border-none px-5 py-2 text-sm font-medium rounded-md cursor-pointer shadow-md hover:translate-y-0.5 transition-all duration-300 ease-in-out"
    >
      Clear
    </button>
  );
};

export default Clear;
