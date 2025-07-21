import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error loading favourites:", error.message);
        setFavorites([]);
      } else {
        setFavorites(data || []);
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
        setFavorites(favorites.filter(fav => fav.book_id !== String(bookId)));
      }
    } catch (error) {
      console.error("Remove error:", error);
      alert("An unexpected error occurred");
    }
  };

  if (loading) {
    return (
      <div className="section-wrapper py-10 px-4 flex justify-center items-start min-h-screen">
        <div style={{ textAlign: "center", padding: 30 }}>
          Loading favourites...
        </div>
      </div>
    );
  }

  return (
    <div className="section-wrapper py-10 px-4 flex justify-center items-start min-h-screen">
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        background: "#f6fbff",
        borderRadius: 20,
        padding: 30,
        boxShadow: "0 2px 16px #00c0ff11"
      }}>
        <h2 style={{ 
          fontSize: 32, 
          fontWeight: 900, 
          marginBottom: 30, 
          color: "#1456A3",
          textAlign: "center"
        }}>
          ❤️ Your Favourite Books
        </h2>

        {favorites.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            color: "#666", 
            fontSize: 18,
            padding: 40
          }}>
            No favourites yet! Start adding some books from the Library.
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {favorites.map((book) => (
              <li
                key={book.id}
                style={{
                  margin: "20px 0",
                  padding: 16,
                  borderRadius: 11,
                  background: "#fff",
                  boxShadow: "0 1px 5px #0001",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: 21,
                    color: "#1761a7",
                    marginBottom: 8
                  }}>
                    {book.title}
                  </div>
                  <div style={{
                    marginBottom: 6,
                    fontSize: 14,
                    color: "#4a6584"
                  }}>
                    <b>Language:</b> {book.language} &nbsp;|&nbsp;
                    <b>Author:</b> {book.author}
                  </div>
                  <div style={{ fontSize: 15, color: "#555" }}>
                    {book.description}
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    color: "#999", 
                    marginTop: 8 
                  }}>
                    Added: {new Date(book.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "#1475fc",
                      color: "#fff",
                      border: "none",
                      fontWeight: 600,
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 14
                    }}
                    onClick={() => window.open(book.url, "_blank", "noreferrer")}
                  >
                    View Notes
                  </button>
                  <button
                    style={{
                      padding: "6px 16px",
                      background: "#ff4757",
                      color: "#fff",
                      border: "none",
                      fontWeight: 600,
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 12
                    }}
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
