App.js 와 NewTask.js 의 공통된 로직을 custom hook으로 만들기

useHttp.js 를 사용해 주었는데, 
App.js 에서

```javascript
useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
```
이부분에서 무한루프가 발생한다. 
fetchTasks 는 hook의 sendRequest 인데, 이 함수를 실행하게 되고 몇몇 상태가 다시 설정이 되게 한다.
useHttp.js에서 sendRequest 함수에서
setIsLoading, setError를 호출하면 App컴포넌트의 재평가를 유발하게됨.
그러면 저 위의 useEffect() 가 다시실행되게 됨.

그래서 useHttp.js 의 sendRequest 부분을 useCallback 으로 감싸야함. 그러고 나서, 의존성에는 
requestConfig 와 applyData를 추가하게되는데,
이것들이 이 함수가 재실행될때마다 재생성되지 않도록 해야함.
그러면 App.js 에서도 transformTasks를 useCallback 으로 감싸야함.
의존성에는 아무것도 추가하지 않아도됨.
이렇게 하면 상태갱신을 하는 함수인 setTasks외에는 
외부에서 쓰고있는것이 없으니깐 불변성이 보장됨.

근데 이렇게 useCallback 으로 감싸줘야하는것이 불편하다면 이 useCallback 을 지우고 


