import AddSong from "../components/AddSong";

const SongList = () => {
  const songs = [
    {
      id: "950294e6-4891-44e9-986b-71cd4459d899",
      song: "Tim McGraw",
      album: "Taylor Swift",
    },
    {
      id: "e1967ff7-a58d-4955-831e-fd7ba59c31e4",
      song: "Teardrops On My Guitar",
      album: "Taylor Swift",
    },
    {
      id: "d835bbfc-9dfc-4067-bfe5-700fd280b25a",
      song: "Shake it Off",
      album: "1989",
    },
  ];

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
