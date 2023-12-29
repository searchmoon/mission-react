## 편리한 form 입력값 추출방법
input이나, select-box, checkbox 등 입력창에 있는 값들을 추출하는 것이 조금 번거로울수있다. useState나, useRef를 사용할수는 있지만, 입력값이 많을때는 전부 다른 상태값이나 참조를 일일이 설정하는것은 비효율적이다.
네이티브에 내장된 기능을 사용하여 값을 추출해보는 방법을 사용하면 좋다.

브라우저에 내장되어있는 FormData constructor는 입력창에 입력된 각기 다른 값들을 쉽게 얻을 수 있도록 도와주는 객체이다.
이벤트 submit 이 일어날 때, new FormData(event.target) 이렇게 하면,
submit의 target은 form 이 되어 form 에 있는 input에 추가된 모든 데이터로 접근할수 있게 해준다. 
** 추출하려는 모든 입력값들에 name 속성이 설정되어있어야한다.
```javascript
const fd = new FormData(event.target);
fd.get("email");
```
이렇게 작성하게 되면 email 이라는 name 속성을 가진 input의 값을 가져올 수 있다.
하나하나 이렇게 하면 번거로우니 Object를 사용한다.
Object 클래스에 formEntries 정적 메소드를 호출하고, FormData 객체에서 불러낸 Entry 메소드의 결과를 여기로 보낸다.
Object.formEntries(fd.entries()); 이렇게 작성한다. 
FormData 객체의 엔트리를 부르는 것은 모든 입력창과 그에 속한 값들의 '배열'을 제공한다.
그리고 그 배열에 있는 Entry로부터 Object를 불러내면 모든 입력창의 핵심 값들을 가지고 있는 객체를 얻을 수 있다.

SignUp.js 컴포넌트에서 
form 태그에 handleSubmit 이라는 이벤트 핸들러를 할당해주고, 이렇게 코드를 작성하면,

```javascript
const handleSubmit = (event) => {
  event.preventDefault();

  const fd = new FormData(event.target);
  const data = Object.fromEntries(fd.entries());
  console.log(data);
};
```
form 안에 있는 모든 input의 value를 data에 담을 수 있음. 코드가 훨씬 깔끔해짐.
input 뿐만 아니라 select-box 도 가능 단, 꼭 요소의 name을 적어줘야함.
보통은 label에 들어가는 이름과 일치시켜줌.
근데, console.log(data) 를 보면, checkbox에 있는 값들은 들어오지 않았다.
코드를 살펴보면 3개의 체크박스는 모두 같은 name 을 사용한다. 우리가 얻고싶은것들은 체크박스의 배열이기 때문에 그렇게 해야한다. 아래의 코드를 보면 주석 1,2번 줄이 추가 되었다. 이 체크박스들의 값을 가져오는 코드다.
1번코드: fd.getAll() 의 괄호 안에 들어갈값은 체크박스의 name 값이다. 
2번코드: 객체속성에 acquisition 을 추가해주었다. 

```javascript
const handleSubmit = (event) => {
  event.preventDefault();

  const fd = new FormData(event.target);
  const acquisitionChannel = fd.getAll("acquisition"); //1
  const data = Object.fromEntries(fd.entries());
  data.acquisition = acquisitionChannel; //2
  console.log(data);
};
```
console창을 확인해보면, checkbox 의 acquisition 의 데이터는 array 로 들어가고,
선택된 값의 value만 들어간다. 