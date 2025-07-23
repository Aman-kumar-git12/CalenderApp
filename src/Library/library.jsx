import React, { useState, useEffect } from "react";
import { dummyBooks } from "../Api/dummyBooks";
import { supabase } from "../supabaseClient";

export default function Library() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all favorite book IDs on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from("favourites")
          .select("book_id");

        if (error) {
          console.error("Error fetching favourites:", error.message);
          setFavorites([]);
        } else {
          const favoriteIds = (data || []).map((fav) => String(fav.book_id));
          setFavorites(favoriteIds);
        }
      } catch (error) {
        console.error("Fetch favorites error:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const isFavorite = (bookId) => favorites.includes(String(bookId));

  // Handle heart click for toggle functionality
  const toggleFavorite = async (book) => {
    const bookIdString = String(book.id);

    try {
      if (isFavorite(book.id)) {
        // Remove from favorites
        const { error } = await supabase
          .from("favourites")
          .delete()
          .eq("book_id", bookIdString);

        if (error) {
          console.error("Delete error:", error.message);
          alert("Error removing from favorites: " + error.message);
          return;
        }

        setFavorites((prev) => prev.filter((id) => id !== bookIdString));
      } else {
        // Add to favorites
        const favoriteData = {
          book_id: bookIdString,
          title: book.title,
          author: book.author,
          language: book.language,
          description: book.description,
          url: book.url,
        };

        const { error } = await supabase
          .from("favourites")
          .insert([favoriteData]);

        if (error) {
          console.error("Insert error:", error.message);
          alert("Error adding to favorites: " + error.message);
          return;
        }

        setFavorites((prev) => [...prev, bookIdString]);
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);
      alert("An unexpected error occurred: " + error.message);
    }
  };

  const filteredBooks = dummyBooks.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.language.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-8 text-center text-xl font-semibold">
        Loading library...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 bg-[#f6fbff] rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-[#1456A3]">
        📚 Programming Books & Notes Library
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title, author, or language..."
        className="w-full mb-6 px-4 py-2 rounded-lg border text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className="list-none p-0 space-y-5">
        {filteredBooks.map((book) => {
          const isBookFavorite = isFavorite(book.id);

          return (
            <li
              key={book.id}
              className="p-4 rounded-xl bg-white shadow-md flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center font-bold text-xl text-[#1761a7]">
                  {book.title}
                  &nbsp;
                  <span
                    onClick={() => toggleFavorite(book)}
                    title={
                      isBookFavorite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    className={`ml-2 cursor-pointer text-2xl select-none transition duration-300 ${
                      isBookFavorite ? "text-red-500" : "text-gray-300"
                    }`}
                  >
                    ♥
                  </span>
                </div>
                <div className="text-sm text-[#4a6584] mb-1">
                  <b>Language:</b> {book.language} &nbsp;|&nbsp;
                  <b>Author:</b> {book.author}
                </div>
                <div className="text-base text-gray-700">
                  {book.description}
                </div>
              </div>
              <button
                onClick={() =>
                  window.open(book.url, "_blank", "noopener,noreferrer")
                }
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md text-sm hover:bg-blue-700 transition shadow-md"
              >
                View Notes
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
