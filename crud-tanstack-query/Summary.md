### AddSong 요약

- useMutation: 비동기 데이터 변경을 관리한다.
- mutationFn: mutation을 실행할 함수를 지정
- onSuccess: 이 옵션은 뮤테이션 성공 시 실행될 콜백 함수
- queryClient.invalidateQueries 메서드는 캐시된 쿼리 데이터를 무효화한다. 최신 데이터 반영을 위한 것.
- queryKey 옵션은 무효화할 쿼리의 키를 지정한것. 배열 데이터 구조의 형태(여러개의 키를 등록할 수 있기때문에)

### Song 요약

- useQuery: 데이터 가져오는 함수
  - queryKey: 캐싱 및 업데이트 관리에 사용되는 키
  - queryFn: 데이터를 가져오는 함수
  - useQuery의 반환값들: isPending(데이터가 로딩 중인지 여부), isError(에러 발생 여부), data(성공적으로 가져온 데이터), error(에러 발생시 에러 정보)

### EditSong 요약

- Song의 로직을 똑같이 받아와서, fetchSong 을 해준 후에, updateSong함수를 mutation 해준다.

### package.json
- "server": "concurrently \"npm run dev\" \"npm run database\"" 는 concurrently 가 두개이상의 명령어를 병렬적으로 실행해준다는 뜻. 그래서 npm run server 로 저 두개를 한꺼번에 실행시켜준다.