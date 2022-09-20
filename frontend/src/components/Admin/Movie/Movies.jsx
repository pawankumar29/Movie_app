/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { deleteMovie, getMovieForUpdate } from "../../../api/movie/movie";
import { toast } from "react-toastify";
import MovieListItem from "./MovieListItem";
import { useEffect } from "react";
import NextPrevBtn from "../Actors/NextPrevBtn";
import UpdateMovieModal from "../../Modals/UpdateMovieModal";
import ConfirmModal from "../../Modals/ConfirmModal";
import { useMovies } from "../../../hooks";

let currentPageNo = 0;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [busy, setBusy] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const fetchMovies = async (pageNo) => {
  //   const { movies, error } = await getMovies(pageNo, limit);
  //   if (error) return toast.error(error.message);

  //   if (!movies?.length) {
  //     currentPageNo = pageNo - 1;
  //     return setReachedToEnd(true);
  //   }

  //   setMovies([...movies]);
  // };

  // Next Page

  const {
    fetchMovies,
    movies: newMovies,
    fetchNextPage,
    fetchPrevPage,
  } = useMovies();

  // const onNext = () => {
  //   if (reachedToEnd) return;
  //   currentPageNo += 1;
  //   fetchMovies(currentPageNo);
  // };

  // // Prev Page
  // const onPrev = () => {
  //   if (currentPageNo <= 0) return;
  //   if (reachedToEnd) setReachedToEnd(false);
  //   currentPageNo -= 1;
  //   fetchMovies(currentPageNo);
  // };

  // Edit Movie
  const handleOnEdit = async ({ id }) => {
    const { movie, error } = await getMovieForUpdate(id);
    if (error) return toast.error(error);
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };

  // Handle Update Movie
  const handleUpdate = (movie) => {
    const updateMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updateMovies]);
  };

  // Delete Movie
  const handleOnDelete = (movie) => {
    setSelectedMovie(movie);
    setShowConfirmModal(true);
  };

  // Delete Movie
  const handleDeleteMovie = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(selectedMovie.id);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success(message);

    hideConfirmModal();
    fetchMovies(currentPageNo);
  };

  // Close Modal
  const hideUpdateModal = () => setShowUpdateModal(false);
  const hideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5 md:pr-72 sm:pr-8">
        {newMovies.map((movie) => (
          <MovieListItem
            onDelete={() => handleOnDelete(movie)}
            onEdit={() => handleOnEdit(movie)}
            key={movie.id}
            movie={movie}
          />
        ))}
        <NextPrevBtn onNext={fetchNextPage} onPrev={fetchPrevPage} />
      </div>

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteMovie}
        busy={busy}
      />

      {/* Update Movie Modal */}
      <UpdateMovieModal
        initialState={selectedMovie}
        visible={showUpdateModal}
        onSuccess={handleUpdate}
        onClose={hideUpdateModal}
      />
    </>
  );
};

export default Movies;
