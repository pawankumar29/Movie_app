import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from "../../../api/actor";
import { toast } from "react-toastify";
import NextPrevBtn from "./NextPrevBtn";
import UpdateActorModal from "../../Modals/UpdateActorModal";

let currentPageNo = 0;
const limit = 12;

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchActors = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error)
      return toast.error("Something Went Wrong While Fetching Actors...");

    if (!profiles?.length) {
      currentPageNo = pageNo - 1;
      toast.error("No More Actors!");
      return setReachedToEnd(true);
    }

    setActors([...profiles]);
  };

  // Next Page
  const onNext = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchActors(currentPageNo);
  };

  // Previous Page
  const onPrev = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchActors(currentPageNo);
  };

  // Edit Actor
  const handleEdit = (profile) => {
    setShowUpdateModal(true);
  };

  // Edit Actor
  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  useEffect(() => {
    fetchActors(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-5 p-5">
          {actors.map((actor) => (
            <ActorProfile
              key={actor.id}
              profile={actor}
              onEdit={() => handleEdit(actor)}
            />
          ))}
        </div>

        <NextPrevBtn onNext={onNext} onPrev={onPrev} />
      </div>
      <UpdateActorModal visible={showUpdateModal} onClose={hideUpdateModal} />
    </>
  );
};

const ActorProfile = ({ profile, onEdit }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  // Get Name
  const getName = () => {
    if (name.length <= acceptedNameLength) return name;
    return name.substring(0, acceptedNameLength) + "..";
  };

  const onMouseEnter = () => {
    setShowOptions(true);
  };

  const onMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const { name, avatar, about = "" } = profile;

  return (
    <div className="bg-white shadow-2xl dark:shadow-2xl dark:bg-secondary h-20 rounded overflow-hidden">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 h-full aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold">
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>

        <Options onEdit={onEdit} visible={showOptions} />
      </div>
    </div>
  );
};

const Options = ({ visible, onEdit, onDelete }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm space-x-2">
      <button
        onClick={onDelete}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 m-2"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEdit}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
export default Actors;
