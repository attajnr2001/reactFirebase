import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  /** states */
  const [moviesList, setMoviesList] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isNice, setIsNice] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollection = collection(db, "movies");

  const getMoviesList = async () => {
    setIsLoading(true);
    try {
      const _data = await getDocs(moviesCollection);
      const data = _data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(data);
      setMoviesList(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  /** getting movies List */
  useEffect(() => {
    getMoviesList();
  }, []);

  /** adding a movie */
  const onsubmitMovie = async () => {
    try {
      await addDoc(moviesCollection, {
        title: title,
        releaseDate: releaseDate,
        isNice: isNice,
        userId: auth?.currentUser?.uid,
      });
      getMoviesList();
    } catch (err) {
      console.log(err);
    }
  };

  /** deleting a movie */
  const deleteMovie = async (id) => {
    try {
      const movie = doc(db, "movies", id);
      await deleteDoc(movie);
      getMoviesList();
    } catch (err) {
      console.log(err);
    }
  };

  /** deleting a movie */
  const updateMovie = async (id) => {
    try {
      const movie = doc(db, "movies", id);
      await updateDoc(movie, { title: newTitle });
      getMoviesList();
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolder = ref(storage, `projectFiles/${fileUpload.name}`);

    try{
      await uploadBytes(filesFolder, fileUpload)
    }catch(err){
      console.log(err)
    }
  };

  return (
    <>
      <Auth />
      <br />
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="released date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <br />
        <label>Is the Movie nice</label>
        <input
          type="checkbox"
          checked={isNice}
          onChange={(e) => setIsNice(e.target.checked)}
        />
        <br />
        <button onClick={onsubmitMovie}>Add Movie</button>
      </div>

      {isloading ? (
        <p>loading...</p>
      ) : (
        moviesList.map((movie) => (
          <div key={movie.id}>
            <h3
              style={{
                color: movie.isNice ? "green" : "red",
              }}
            >
              {movie.title}
            </h3>
            <p>published in {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button> <br />
            <input
              type="text"
              placeholder="new Title"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={() => updateMovie(movie.id)}>update title</button>
          </div>
        ))
      )}

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </>
  );
}

export default App;
