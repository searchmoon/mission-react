# React + Vite

- tanstack query 의 핵심개념: HTTP 요청을 전송하고 프론트엔드 사용자 인터페이스를 백엔드 데이터와 동기화된 상태로 유지하는 데 이용하는 라이브러리
- 이 라이브러리를 이용하면 리액트 앱 내부에서 HTTP 요청을 간편하게 보낼 수 있다. 리액트 프론트엔드를 백엔드에 연결하기가 수월하다.
- useEffect와 fetch 대신 더 편리하게 쓸 수 있다. (코드가 매우 간결해지고, 훨씬 수월하게 작업 가능)

* 학습내용:
1. 데이터를 가져오고 변형하는 방법
2. crud(get, post, put, delete) 요청을 전송하는 방법
3. 이 라이브러리에서 제공하는 캐시를 사용하는 방법
4. 캐시의 작동 원리, 캐시를 무효화하고 변경하는 방법 등

참고 공식문서: https://tanstack.com/query/latest

* 프로그램 설치 및 실행
이 디렉토리에서는 백엔드 프로그램도 같이 실행해야함.
cd backend
npm install  후  npm start
(프로젝트 작업 동안에는 가동상태 유지하기. 새 터미널창 열고, 메인프로젝트로 가서 또 추가로 실행)
npm run dev(vite 프로젝트임)

* tanstack query 설치
npm install @tanstack/react-query (버전 5로 설치하기. 현재 기준)

* useQuery 훅
useQuery 는 자체적으로 작동해서 HTTP 요청을 전송하고 이 섹션에 필요한 이벤트 데이터를 가져오고 로딩 상태에 대한 정보를 제공한다. 그래서 요청 전송 중에 발생한 오류를 알 수 있다. 이러한 기능이 실행되게 하려면 훅을 구성해야 하는데, 구성하는 방법은 useQuery에 객체를 전달하는 것.
객체에 들어가는 속성들을 알아보자.
* queryFn:
이 객체에 다양한 프로퍼티를 설정할 수 있는데 그중 하나가 queryFn 프로퍼티. (쿼리 함수를 의미) 이 함수를 이용해 실제 요청을 전송할 때 실행할 실제 코드를 정의하는 것.
Tanstack 쿼리에는 HTTP 요청을 전송하는 로직이 내장돼 있지 않다. 대신 Tanstack 쿼리는 요청을 관리하는 로직을 제공한다. 요청과 관련된 데이터와 발생 가능한 오류를 추적하는 역할 등을 한다. 그래서 요청을 전송하는 코드는 직접 작성해야 하는데, useQuery 를 통해 원하는 방식으로 정의하면된다.

* queryKey:
전송하는 모든 GET HTTP 요청에는 쿼리 키가 있다. Tanstack 쿼리는 내부에서 이 쿼리 키를 이용해 요청으로 생성된 데이터를 캐시 처리. 그래서 나중에 동일한 요청을 전송하면 이전 요청의 응답을 재사용할 수 있다. 
리액트 쿼리에서 데이터를 저장하고 재사용하는 기간을 구성할 수 있고 사용자에게 데이터를 더 빨리 제공할 수 있게 해준다. 이미 있는 데이터라면 매번 다시 가져올 필요가 없으니까.. 그래서 모든 쿼리에는 이러한 키가 필요하다.
그리고 이 키는 배열이다. 이 값의 배열을 리액트 쿼리는 내부적으로 저장한다.

그래서 유사한 값으로 이루어진 유사한 배열을 사용할 때마다 리액트 쿼리는 이 배열을 확인하고 기존 데이터를 재사용. 
예를 들면 이 배열의 첫 번째 요소로 문자열을 추가하고 events를 식별자로 지정한다. 이 식별자 이름은 원하는 대로 구성할 수 있다. 키에는 값이 여러 개일 수도 있고 유형이 문자열로 제한되지 않는다. 객체를 사용하거나 중첩 배열이나 다른 종류의 값을 사용할 수도 있다. 이 값은 재사용에 필요한 식별자로 사용된다. 
```
const { data, isPending, error, isError } = useQuery({
    queryKey: ["events"], // 배열, 객체 등도 들어갈 수 있다. 값도 여러개일 수 있음
    queryFn: fetchEvents, 
  });
```

이 useQuery가 실행되면 객체를 얻을 수 있다. 객체 결과값 확인해보기. 이 객체에서 객체 구조 분해를 사용해 가장 중요한 요소를 추출할 수 있다. (data, isPending, isError, error, refetch 등 여기서 사용해보겠다.)
NewEventsSection.jsx 참고

예를 들면, useQuery가 반환한 객체에서 data 프로퍼티를 추출 이 프로퍼티에는 실제 응답 데이터가 값으로 들어 있다. 
- data: 이 데이터는 커스텀 fetch 함수를 통해 반환된다. 그리고 쿼리 실행이 완료되면 결국 data 프로퍼티에 값으로 전달된다. 
- isPending:이 과정이 즉각적으로 이루어지지는 않고, 먼저 첫 번째 단계로 요청이 전송돼야 하고 응답이 있을 때까지 기다려야 한다. 그래서 이 객체는 isPending 속성을 갖는다. 요청이 여전히 실행 중인지 응답을 받았는지 알려주는 기능.
- isError: 응답받은 결과가 반드시 data 인것은 아니다. 문제가 있다면, isError 를 반환한다. boolean 값. 응답에 오류 상태코드가 있는경우, 이 경우에는 fetchEvents 함수에 있는 이 코드가 그런 역할을 함. 400 이나 500 같은 응답 코드를 받았는지 확인하고, 코드가 있으면 true를 반환.
- error: isError가 true 일때, 발생한 오류에 대한 정보가 포함된 프로퍼티.
- refetch: 함수를 수동으로 호출해 사용자가 버튼을 눌렀을 때, 동일한 쿼리를 다시 전송할 수 있다.

이런 코드를 설정하고 나서,
App.jsx 에
```jsx
const queryClient = new QueryClient();

function App(){
	return (
		<QueryClientProvider client={queryClient}> 
			<RouterProvider router={router}/>
		</QueryClientProvider>
	)
}
```

이렇게 QueryClientProvider로 래핑을 해주고, client를 queryClient 로 설정해주면 완료.

브라우저를 새로고침했을경우나, ViewDetails 버튼을 클릭 후 다시 돌아올때, 데이터 요청을 한번 더 보내는 것이 아니라, 쿼리키를 이용하여 데이터를 가져오기 때문에, 아무리 느린속도에서의 환경이라도 화면에 데이터가 즉각적으로 표시된다.(이것이 캐시처리.)(이미지 데이터는 링크를 통해 포함되고 브라우저가 가져와서 즉각적으로 표시안될 수 있음)
리액트 쿼리는 요청을 통해 얻은 응답 데이터를 캐시 처리하고 나중에 동일한 쿼리 키를 가진 다른 useQuery가 실행되면 이 데이터를 재사용한다. 이와 동시에, 내부적으로 이 요청을 다시 전송해서 업데이트된 데이터가 있는지 확인하고, 업데이트된 데이터로 이 데이터를 자체적으로 교체한다. 데이터를 가져오는 데 몇 초가 걸릴 수도 있고 더 오랜 시간이 걸릴 수도 있지만 화면에는 업데이트된 데이터가 표시된다.

* staleTime: 캐시에 데이터가 있을때, staleTime을 5000으로 설정을 하면, 5초 동안 기다린 후에 추가 요청을 보낸다. 불필요한 요청 전송을 방지할 수 있다. 기본값은 0 이다. 그러므로 따로 값을 설정을 해주지 않으면 queryKey 의 events(이 코드의 예를 들면) 요청이 전송된다.

* gcTime: 가비지 콜렉터 시간을 의미 데이터와 캐시를 얼마나 오랜동안 보관할지 제어한다. 기본값은 5분.


* FindEventSection.jsx에 대한 설명:
이 컴포넌트는 이 화면에 렌더링된 데이터에서
search 인풋에 내용을 입력하여 해당되는 결과를 출력하는 기능을 한다.

먼저, useQuery를 import 한다. 
기본적으로 queryFn, queryKey 가 필요하다. (항상 같다 이 두개는)
queryFn에 넣어주는 함수는 fetchEvents를 이용하겠다.
검색 결과를 통합하려면 이 백엔드 URL에 쿼리 매개변수를 추가하면 된다. search 쿼리 매개변수를 사용자가 입력한 검색어로 설정해야 한다. 이 쿼리 매개변수는 항상 추가되면 안됨. FindEventSection에서 요청이 트리거되었을 때만 추가돼야 된다. http.js 의 fetchEvents 함수의 매개변수에 searchTerm 을 추가해준다.

백엔드 URL을 동적으로 구성한다.
searchTerm이 false 가 아니면,
즉, 빈 문자열이 아니고 값이 있으면 이 문자열을 URL에 추가해야한다.
이 문자열은 search 쿼리 매개변수에 해당한다.

let url = 'http://localhost:3000/events';
로 설정해주어 기본 url을 설정해주고, 
if(searchTerm) {
    url += '?search=' + searchTerm
}
이렇게 조건문으로 동적으로 설정을 해준 후
const response = await fetch(utl);
으로 해준다.

FindEventSection.jsx 에서는
queryFn에 전달하는 함수에 입력창에 입력된 검색어(searchTerm)가 전달되도록 해야하기 때문에 함수로 래핑한다. 
() => fetchEvents(searchTerm)
searchTerm 은 상태값이고, 이 상태값을 변경하는 함수는 setSearchTerm 이다.
setSearchTerm으로 받는 값은,
useRef를 이용하여 input의 ref를 참조하고, 그 ref의 current.value를 추출하여 
const searchElement = useRef();
fetchEvents(searchTerm); 으로 설정하여 queryFn 에 전달해준다.( 코드 참고하기)
queryKey 는 NewEventsSection에서 사용했던 events 를 가져오지만, 아예 동일하면 같은 데이터를 가져오기 때문에 이것은 모든 결과가 필요한게 아니라 현재 검색중인 인부 결과만이 필요하기 때문에 다른 쿼리키를 이용해야 한다.
이 queryKey는 동적으로 변해야한다. 검색결과가 바뀌기때문에. 그래서 이 키에 객체를 전달한다. 객체는
queryKey: ['events', {search:searchElement.current.value}]
로 쿼리키를 설정해줄수 있을줄 알았지만, ref는 리랜더링이 되지않기 때문에, 이것을 useState를 사용해 상태값으로 넣어주어 전달하는것이다. 
queryKey: ['events', {search: searchTerm}]

* http.js 컴포넌트에서 console.log(searchTerm) 을 출력해봤을때,
첫번째값은 객체, 두번째값은 비어있는 데이터가 출력이된다.
useQuery훅은 여기에 정의한 이 쿼리함수에 기본데이터를 전달한다. 
이때 전달되는 데이터는 쿼리에 사용된 쿼리키와 신호에 대한 정보를 제공하는 객체이다. 
{queryKey: 블라블라, signal: 블라블라}
이 signal은 요청을 취소할때 필요하다. 

예를 들면 요청이 완료되기 전에 사용자가 페이지에서 나가는 경우. 리액트는 이와 같이 자동으로 요청을 취소할 수 있는데 이 용도로 이 signal을 사용한다. 이러한 signal을 제공하고 데이터를 가져오는 함수에 필요한 쿼리 키를 제공하기 위해 리액트 쿼리는 쿼리 함수로 정의된 이 함수에 객체를 전달한다. 

http.js의
fetchEvents의 파라미터로 객체를 넣어주는것이다. 그 객체를 구조분해해서
export async function fetchEvents({signal});
이렇게 해주고, 이 signal을 fetch() 의 두번째 인수로 추가하면된다.
const response = await fetch(url, {signal: signal}) 이렇게. 
그러면 브라우저는 내부에서 이 취소 신호를 받아 요청을 중지할 수 있다. 이것이 한가지 해야할 일. 
두번째 해야할일은
searchTerm 을 확실히 전달하는것인데, 
fetchEvents에서 수신하는 이 객체에 두번째 프로퍼티를 사용한다. 원하는 이름으로 지정하면 되는데, searchTerm 이라고 하겠다.
export async function fetchEvents({signal, searchTerm}); 
이렇게 설정해주고,
FindEventSection으로 가보면 fetchEvents가 익명 함수로 래핑돼 있는데, 이 fetchEvents에 객체를 전달하고, 이 객체에 searchTerm이라는 프로퍼티를 설정한다. fetchEvents에 (searchTerm)
으로 되어있던것을{} 이것으로 감싸주었다.
queryFn: () => fetchEvents({searchTerm}),