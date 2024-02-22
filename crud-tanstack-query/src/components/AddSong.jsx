import { useMutation, useQueryClient } from "@tanstack/react-query";
import SongForm from "./SongForm";
import { v4 as uuidv4 } from "uuid";
import { createSong } from "../services/songsApi";

const AddSong = () => {
  const queryClient = useQueryClient();

  const createSongMutation = useMutation({
    mutationFn: createSong, // 첫번째 인자: 데이터 생성로직을 담은 함수 이름
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      // 이것을 호출하여 songs 키를 가진 모든 쿼리의 캐시를 무효화한다.
      // 이 캐시 무효화는 데이터가 업데이트된 것을 반영하기 위해 필요
      console.log("Song created successfully");
    }, // 뮤테이션 성공 시 실행될 콜백함수 설정.
  });

  const handleAddSong = (song) => {
    createSongMutation.mutate({
      id: uuidv4(),
      ...song,
    }); // .mutate()로 뮤테이션을 실행한다.
  };
  return (
    <div>
      <h2>Add New Song</h2>
      <SongForm onSubmit={handleAddSong} initialValue={{}} />
    </div>
  );
};

export default AddSong;
