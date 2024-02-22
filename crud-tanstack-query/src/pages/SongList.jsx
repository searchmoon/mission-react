import { useNavigate } from "react-router-dom";
import AddSong from "../components/AddSong";
import { useDeleteSong } from "../custom-hooks/mutations";
import { useSongs } from "../custom-hooks/queries";

const SongList = () => {
  const navigate = useNavigate();

  const { isPending, isError, data: songs, error } = useSongs();

  const deleteSongMutation = useDeleteSong();

  if (isPending) return <span>Loading Taylor's songs...</span>;
  if (isError) return `Error: ${error.message}`;

  const handleDelete = (id) => deleteSongMutation.mutate(id);

  return (
    <section>
      <AddSong />
      {songs?.map((hitsong) => (
        <div
          key={hitsong.id}
          style={{
            backgroundColor: "#FFCCCB",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h4 className="song-heading" onClick={() => navigate(`/song/${hitsong.id}`)}>
            Song: {hitsong.song}
          </h4>
          <button onClick={() => navigate(`/song/${hitsong.id}/edit`)} className="btn-general">
            Edit
          </button>
          <button onClick={() => handleDelete(hitsong.id)} className="btn-danger">
            Delete
          </button>
        </div>
      ))}
    </section>
  );
};

export default SongList;
