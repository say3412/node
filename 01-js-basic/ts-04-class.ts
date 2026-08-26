class Animal {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance}`);
  }

  public getInfo(): string {
    return `name: ${this.name}, age: ${this.age}`;
  }
}

const ani1 = new Animal("기린", 3);
console.log("기린의 정보: ", ani1.getInfo())

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public bark(): void {
    console.log("멍멍");
  }

  public getInfo(): string {
    return `${super.getInfo()}, 품종: ${this.breed}`;
  }
}

const golden = new Dog("Golden", 2, "골든 리트리버");
console.log("dog info: ", golden.getInfo());
golden.bark();
golden.move(20);


interface Flyable {
  fly(): void
}

class Bird extends Animal implements Flyable {
  private wingspan: number;

  constructor(name: string, age: number, wingspan: number) {
    super(name, age);
    this.wingspan = wingspan;
  }

  public fly(): void {
    console.log(`${this.name} is flying with wingspan ${this.wingspan}`);
  }
}

const bird1 = new Bird("참새", 2, 7);
console.log(bird1.getInfo());
bird1.fly();