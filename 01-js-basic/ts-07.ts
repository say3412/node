import 'reflect-metadata'

function MarkController(constructor: Function) {
  console.log("등록된 클래스: ", constructor.name);
}

@MarkController
class ExampleClass {
  constructor(public name: string) {}
}

const example = new ExampleClass("Gildong");
console.log("example name: ", example.name);