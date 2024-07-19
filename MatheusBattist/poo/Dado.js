class Dado {
  constructor(faces) {
    this.faces = faces;
  }

  jogar() {
    console.log("Resultado do dado: " + this.getRandomIntInclusive(1, this.faces));
    this.getRandomIntInclusive(1, this.faces);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const d6 = new Dado(6);
d6.jogar();

const d12 = new Dado(12);
d12.jogar();
