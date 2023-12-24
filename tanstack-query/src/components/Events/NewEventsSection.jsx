import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["events"], // query key를 이용하여 캐시 처리 하고, 나중에 동일한 요청을 전송하면 이전 요청의 응답을 재사용할 수있다.
    queryFn: fetchEvents, // promise 를 반환하는 함수를 넣어줌
    staleTime: 5000, // 불필요한 요청을 방지할 수 있다. 업데이트된 데이터를 가져오기 위한 요청을 자체적으로 전송하기 전에 기다릴 시간을 설정하는 것.
    //gcTime: 1000 //garbage collection time. 데이터와 캐시를 얼마나 오래 보관할지
  });
  
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
