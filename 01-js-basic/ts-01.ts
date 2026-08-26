let isDone: boolean = false;
console.log("boolean: ", isDone);

let decimal: number = 123;
console.log("boolean: ", decimal);

let color: string = "blue";
console.log("string: ", color);

let list: number[] = [1,2,3];
console.log("list: ", list);

let tuple: [string, number] = ["hello", 2];
console.log("tuple: ", tuple);

enum Color {
  Red, Green, Blue, Orage
}

let fColor: Color = Color.Blue;
let rColor: Color = Color.Red;
console.log("Color.Blue: ", fColor);
console.log("Color.Red: ", rColor);
let gColor: string = Color[1];
console.log("Color[1]: ", gColor);
let oColor: string = Color[3];
console.log("Color[3]: ", oColor);

let notSure: any = 4;
notSure = "string";
console.log("notSure: ", notSure);

let unionType: string | number = "hello";
// unionType = false; // error
unionType = 1;
console.log("unionType: ", unionType);
