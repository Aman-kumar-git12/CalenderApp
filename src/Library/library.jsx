import React from "react";
import { dummyBooks } from "../Api/dummyBooks"; // Import the above array

export default function Library() {
  return (
    <div style={{
      maxWidth: 700, margin: "40px auto", background: "#f6fbff", borderRadius: 20, padding: 30, boxShadow: "0 2px 16px #00c0ff11"
    }}>
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 30, color: "#1456A3" }}>
        📚 Programming Books & Notes Library
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {dummyBooks.map(book => (
          <li
            key={book.id}
            style={{
              margin: "20px 0", padding: 16, borderRadius: 11, background: "#fff",
              boxShadow: "0 1px 5px #0001", fontSize: 18, display: "flex", alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 21, color: "#1761a7" }}>{book.title}</div>
              <div style={{ marginBottom: 6, fontSize: 14, color: "#4a6584" }}>
                <b>Language:</b> {book.language} &nbsp;|&nbsp;
                <b>Author:</b> {book.author}
              </div>
              <div style={{ fontSize: 15, color: "#555" }}>{book.description}</div>
            </div>
            <button
              style={{
                padding: "8px 18px",
                background: "#1475fc", color: "#fff", border: "none", fontWeight: 700,
                borderRadius: 6, marginLeft: 18, cursor: "pointer", fontSize: 16, boxShadow: "0 1px 4px #1475fc15"
              }}
              onClick={() => window.open(book.url, "_blank", "noreferrer")}
            >
              View Notes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
