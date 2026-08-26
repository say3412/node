function add(x: number, y: number): number {
  return x + y;
}

console.log("add: ", add(4, 3));

function multiply(x: number, y: number, z: number): number {
  return x * y * z;
}

console.log("multiply: ", multiply(1, 2, 3));

function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

console.log("buildName: ", buildName("Sarah", "Lee"));
console.log("buildName: ", buildName("Sarah"));

function greet(name: string, greeting: string = "안녕하세요."): string {
  return `${greeting} ${name}`;
}
console.log(greet("Jiu", "Hello"));
console.log(greet("Hani"));

function identity<T>(arg: T): T {
  return arg;
}
console.log("number: ", identity<number>(42));
console.log("string: ", identity<string>("42"));

function identity2(arg: any): any {
  return arg;
}
console.log("any: ", identity2(42));
console.log("any: ", identity2("42"));

function logValue<T extends string | number>(value: T): void {
  console.log(value);
}

logValue(42);
logValue("42");
// logValue(true); error

function buildCearchUrl(keyword: string, category?: string, minPrice?: number): string {
  let url = `product?keword=${keyword}`;
  url += category ? `&category=${category}` : "";
  url += minPrice ? `&minPrice=${minPrice}` : "";
  // if (category) { url += `&category=${category}`}
  // if (minPrice) { url += `&minPrice=${minPrice}`}

  return url;
}

console.log(buildCearchUrl("이어폰"));
console.log(buildCearchUrl("이어폰", "전자기기"));
console.log(buildCearchUrl("이어폰", "전자기기", 50000));