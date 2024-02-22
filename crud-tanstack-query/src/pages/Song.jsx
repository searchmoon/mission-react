import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSong } from "../services/songsApi";

const Song = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isPending,
    isError,
    data: hitSong,
    error,
  } = useQuery({
    queryKey: ["songs", id], //캐싱 및 업데이트 관리에 사용되는 키
    queryFn: () => fetchSong(id), //fetchSong이라는 함수를 사용하여 특정 id의 노래정보를 가져온다.
  });

  if (isPending) return <span>Loading Taylor's song...</span>;
  if (isError) return <span>`Error: ${error.message}`</span>;
  // 이렇게 상태값에 따라 렌더링이 달라진다.

  return (
    <>
      <button onClick={() => navigate("/")} className="btn-general">
        Back Song List
      </button>
      <figure style={{ backgroundColor: "#FFCCCB", padding: "1rem" }}>
        <h2>Song: {hitSong?.song}</h2>
        <p>
          <strong>Album:</strong> {hitSong?.album}
        </p>
      </figure>
    </>
  );
};

export default Song;
