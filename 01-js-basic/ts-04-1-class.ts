class Animal1 {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 본문(Body)을 가진 생성자(constructor)를 1개만 정의 할 수 있음!
  // constructor(name: string) {
  //   this.name = name;
  // }

  public move(distance: number = 0): void {
    console.log(`${this.name} 이 ${distance} 이동했습니다.`);
  }

  public getInfo() {
    console.log(`이름은 ${this.name} 이고, 나이는 ${this.age} 입니다.`);
  }
}

class Cat extends Animal1 {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  // constructor(name: string, breed: string) {
  //   super(name);
  //   this.breed = breed;
  // }
}
