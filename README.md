# MovieApp 🎬

A **React-based movie search and discovery app** that allows users to explore movies, view detailed information, and save their favorite ones. The app fetches data from the **OMDb API** and displays popular movies on the initial load.

## 📌 Features

### 🔍 Movie Search & Discovery
- Search for movies using the OMDb API
- Display search results with **posters, titles, years, and ratings**
- View detailed movie information (actors, plot, director, box office, etc.)

### 🎞️ Initial Popular Movies
- On initial load, fetch **100+ popular Telugu movies** from **2004 to 2024**
- Fetch multiple pages of results using pagination
- Fetch detailed data for each movie before rendering

### 🎭 Interactive UI
- **Hover Effects**: Movie posters fade on hover, revealing additional details
- **Overlay Text**: Displays movie details like actors, plot, director, etc.
- **Save Button**: Allows users to mark movies as saved or unsaved
- **Like Button**: Users can like movies

### 🏷️ Sorting & Filtering
- Sort by popularity, rating, and release date
- Filter by genre (Action, Comedy, Drama, Sci-Fi, etc.)

### ❤️ Save & Bookmark Movies
- Click on the save button to bookmark a movie
- Saves the state of bookmarked movies

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### Installation
```sh
# Clone the repository
git clone https://github.com/HariSirikonda/Movie-Search-React-app
cd movie-app

# Install dependencies
npm install  # or yarn install
```

### API Setup
- Get a free API key from **[OMDb API](https://www.omdbapi.com/)**
- Create a `.env` file in the project root:

```env
REACT_APP_OMDB_API_KEY=your_api_key_here
```

### Running the App
```sh
npm start  # or yarn start
```

The app will be available at **http://localhost:3000**.

---

## 🛠️ Technologies Used
- **React.js** – Frontend framework
- **Bootstrap** – UI styling and responsive design
- **OMDb API** – Movie data source
- **React Hooks** – State and lifecycle management

---

## 🗂️ Project Structure
```sh
movie-app/
│── src/
│   │── components/
│   │   ├── MovieCard.js      # Movie card component
│   │   ├── MovieList.js      # List of movies
│   │   ├── SearchBar.js      # Search input
│   │── assets/               # Image assets
│   │── App.js                # Main app component
│   │── index.js              # Entry point
│── public/
│── package.json
│── README.md
```

---

## 📸 Screenshots
### 🔹 Movie Search & Results
![Movie Search](C:\Users\haris\Documents\MY COURCES\REACT INTERNSHIP - CODTECH\Movie Search app\moviesearch\src\assets\Screenshot1.png)

### 🔹 Movie Details Overlay
![Movie Details](https://via.placeholder.com/800x400)

### 🔹 Save & Bookmark
![Save Button](https://via.placeholder.com/800x400)

---

## 🏗️ Future Enhancements
✅ Add a **watchlist** feature
✅ Implement **dark mode**
✅ Integrate **trailer videos** from YouTube
✅ Add **user authentication** for personalized movie lists

---

## 💡 Contribution
Feel free to submit issues or pull requests! 

```sh
git checkout -b feature-branch
git commit -m "Added new feature"
git push origin feature-branch
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 📧 Contact
For questions or suggestions, feel free to reach out:
📩 Email: your-harisirikonda22@gmail.com  
🔗 GitHub: [HariSirikonda](https://github.com/HariSirikonda)

Happy Coding! 🎬🚀
