import React, { useState, useEffect } from "react";
import { dummyBooks } from "../Api/dummyBooks";
import { supabase } from "../supabaseClient";

export default function Library() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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
          // Convert all book_ids to strings for consistent comparison
          const favoriteIds = (data || []).map(fav => String(fav.book_id));
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

  // Check if a book is already favorited
  const isFavorite = (bookId) => {
    return favorites.includes(String(bookId));
  };

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

        // Update local state
        setFavorites(favorites.filter((id) => id !== bookIdString));
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

        // Update local state
        setFavorites([...favorites, bookIdString]);
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);
      alert("An unexpected error occurred: " + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        maxWidth: 700, 
        margin: "40px auto", 
        padding: 30, 
        textAlign: "center" 
      }}>
        Loading library...
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 700,
      margin: "40px auto",
      background: "#f6fbff",
      borderRadius: 20,
      padding: 30,
      boxShadow: "0 2px 16px #00c0ff11"
    }}>
      <h2 style={{ 
        fontSize: 32, 
        fontWeight: 900, 
        marginBottom: 30, 
        color: "#1456A3" 
      }}>
        📚 Programming Books & Notes Library
      </h2>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {dummyBooks.map((book) => {
          const isBookFavorite = isFavorite(book.id);
          return (
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
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: 21,
                  color: "#1761a7"
                }}>
                  {book.title}
                  &nbsp;
                  <span
                    onClick={() => toggleFavorite(book)}
                    title={
                      isBookFavorite 
                        ? "Remove from favourites" 
                        : "Add to favourites"
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: 22,
                      color: isBookFavorite ? "#ff4757" : "#ddd",
                      userSelect: "none",
                      transition: "color 0.3s ease, transform 0.2s ease",
                      marginLeft: 8
                    }}
                  >
                    ♥
                  </span>
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
              </div>
              <button
                style={{
                  padding: "8px 18px",
                  background: "#1475fc",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  borderRadius: 6,
                  marginLeft: 18,
                  cursor: "pointer",
                  fontSize: 16,
                  boxShadow: "0 1px 4px #1475fc15"
                }}
                onClick={() => window.open(book.url, "_blank", "noreferrer")}
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
