import Cats from "./Cats";
import SearchInput from "./SearchInput";

function SearchAndCats() {
  return (
    <div className="flex justify-between items-center max-w-[1200px] mx-auto my-10">
      <SearchInput />
      <Cats />
    </div>
  );
}

export default SearchAndCats;
