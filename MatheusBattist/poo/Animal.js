class Animal {
  constructor(name, age, price) {
    this.name = name;
    this.age = age;
    this.price = price
  }

  ChecarEstoque() {
    return 10
  }
}

class Cachorro extends Animal {
  constructor(name, age, price, raca, cor) {
    super(name, age, price)
    this.raca = raca
    this.cor = cor
  }

}

const dog = new Cachorro("Rex", 5, 1000, "viralata", "branco");

console.log(dog.ChecarEstoque())