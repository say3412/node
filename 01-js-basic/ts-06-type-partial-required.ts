interface User {
  name: string;
  age: number;
  email?: string;
}

const user2: User = {
  name: "LUlu", age: 20
}

type partialUser = Partial<User>; // Partial 키워드: 인터페이스 속성을 전부 선택적으로 바꿔준다.

const puser1: partialUser = {

}

type RequiredUser = Required<User>; // Required: 인터페이스 속성을 전부 필수로 바꿔준다.

const ruser1: RequiredUser = {
  name: "", age:3, email:""
}

type ReadonlyUser = Readonly<User>; // ReadOnly: 인터페이스 속성을 전부 읽기전용으로 바꿔준다. (거의 쓰이진 않음)
