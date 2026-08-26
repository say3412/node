interface User {
  name: string;
  age: number;
}

const user1: User = {
  name: "Sarah",
  age: 21
}

console.log(user1);

// product
interface Product {
  title: string;
  price: number;
}

const product1: Product = {
  title: "Sunkist",
  price: 200,
}

console.log(product1);

// 선택적 propertie : ?
interface ColorConfig {
  color?: string;
  width?: number;
}

const config1: ColorConfig = {
  color: "red",
}
console.log(config1);

interface UpdateProfileDTO {
  nickname: string;
  phone?: string;
  marketingAgreed?: boolean;
}

const updateProfile1: UpdateProfileDTO = {
  nickname: "apple",
}
console.log(updateProfile1);

// 상속
interface Admin extends User {
  role: string
}

const admin1: Admin = {
  name: "Sarah",
  age: 30,
  role: "admin",
}

// type : 자료형은 주로 interface를 사용, Status 같은 것에 사용 * 아래 참조
type Student = {
  name: string;
  age: number;
}

type Status = "pending" | "paid" | "shipped";

interface Order {
  id: number;
  status: Status;
}

const order1: Order = {
  id: 1,
  status: "pending",
}

// 인터페이스 확장
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

const square: Square = {
  color: "red",
  sideLength: 30
}
console.log("square: ", square);