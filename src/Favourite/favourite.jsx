import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading favourites:", error.message);
        setFavorites([]);
      } else {
        setFavorites(data || []);
        setFilteredFavorites(data || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = favorites.filter((book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.language.toLowerCase().includes(query)
    );
    setFilteredFavorites(filtered);
  };

  const removeFavorite = async (bookId) => {
    if (!window.confirm("Remove this item from favorites?")) return;

    try {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("book_id", String(bookId));

      if (error) {
        console.error("Error removing favorite:", error.message);
        alert("Error removing favorite: " + error.message);
      } else {
        const updated = favorites.filter((fav) => fav.book_id !== String(bookId));
        setFavorites(updated);
        setFilteredFavorites(updated.filter((book) =>
          book.title.toLowerCase().includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery) ||
          book.language.toLowerCase().includes(searchQuery)
        ));
      }
    } catch (error) {
      console.error("Remove error:", error);
      alert("An unexpected error occurred");
    }
  };

  if (loading) {
    return (
      <div className="section-wrapper py-10 px-4 flex justify-center items-start min-h-screen">
        <div className="text-center p-8 text-lg font-semibold text-gray-600">
          Loading favourites...
        </div>
      </div>
    );
  }

  return (
    <div className="section-wrapper py-10 px-4 flex justify-center items-start min-h-screen">
      <div className="max-w-3xl w-full bg-[#f6fbff] rounded-2xl p-8 shadow-md shadow-cyan-200">
        <h2 className="text-3xl font-black mb-6 text-[#1456A3] text-center">
          ❤️ Your Favourite Books
        </h2>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search by title, author, or language..."
          value={searchQuery}
          onChange={handleSearch}
          className="mb-6 w-full px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
        />

        {filteredFavorites.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-10">
            No favourites found!
          </div>
        ) : (
          <ul className="list-none p-0">
            {filteredFavorites.map((book) => (
              <li
                key={book.id}
                className="my-5 p-4 rounded-xl bg-white shadow-sm text-base flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="font-bold text-xl text-[#1761a7] mb-2">
                    {book.title}
                  </div>
                  <div className="mb-2 text-sm text-[#4a6584]">
                    <b>Language:</b> {book.language} &nbsp;|&nbsp;
                    <b>Author:</b> {book.author}
                  </div>
                  <div className="text-gray-700 text-sm">{book.description}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    Added: {new Date(book.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition"
                    onClick={() => window.open(book.url, "_blank", "noreferrer")}
                  >
                    View Notes
                  </button>
                  <button
                    className="px-4 py-1.5 bg-red-500 text-white font-semibold text-xs rounded-md hover:bg-red-600 transition"
                    onClick={() => removeFavorite(book.book_id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
