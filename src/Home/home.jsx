import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "📝 Notes",
    description:
    "Create and organize your personal notes with meaningful titles. A space just for your thoughts.",
    image:
    "https://img.freepik.com/free-vector/education-learning-concept-love-reading-people-reading-students-studying-preparing-examination-library-book-lovers-readers-modern-literature-flat-cartoon-vector-illustration_1150-60938.jpg?w=740",
    link: "/notes",
},
{
    title: "📂 Saved Notes",
    description:
    "Access, edit, and delete your saved notes whenever you need. Stay organized effortlessly.",
    image:
    "https://arunjyoti24home.files.wordpress.com/2019/07/5-tips-to-develop-effective-study-skills-1.jpg",
    link: "/saved",
},
{
    title: "📚 Programming Library",
    description:
    "Explore a rich collection of notes on programming languages, curated for learners like you.",
    image:
    "https://gimgs2.nohat.cc/thumb/f/640/people-reading-books-for-study-vector-illustration-free-vector--471aa4c107564eacbb6d.jpg",
    link: "/library",
},
{
    title: "❤️ Favourites",
    description:
    "Mark your favorite library notes and access them quickly. Add or remove anytime.",
    image:
    "https://img.freepik.com/free-vector/hand-drawn-college-entrance-exam-illustration_23-2150359353.jpg",
    link: "/favourite",
  },
];

const Home = () => {
  return (
    <div className="section-wrapper py-10 px-4 transition-colors duration-500 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Smart Notes Hub
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your one-stop productivity tool to create, manage, and explore notes in an elegant interface.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {features.map((feature, index) => (
          <Link
            to={feature.link}
            key={index}
            className="group rounded-2xl overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl bg-white dark:bg-[#1f1f2b]"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl text-white font-semibold mb-2">{feature.title}</h2>
              <p className="text-white">{feature.description}</p>
              <div className="mt-4 text-blue-600 group-hover:underline text-whitefont-medium">
                Explore →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105"
        >
          ✏️ Start Making Notes...
        </Link>
      </div>
    </div>
  );
};

export default Home;
