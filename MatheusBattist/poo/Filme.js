class Filme {
  constructor(title, age, genre, director, autor, duration) {
    this.title = title;
    this.age = age;
    this.genre = genre;
    this.director = director;
    this.autor = autor;
    this.duration = duration;
  }

  Reproduzir() {
    console.log("Reproduzindo...");
  }

  Pausar() {
    console.log("Pausado ||");
  }

  Avancar() {
    console.log("Avançar >>");
  }

  fechar() {
    console.log("Fechando X");
  }

  ficha() {
    console.log(this.title, this.age, this.genre, this.director, this.autor, this.duration)
  }

}

const Hulk = new Filme("Hulk", 2010, "Ação", "Chadwick Boseman", ["Mark Ruffalo", "Chris Hemsworth"], 120);
const Vingadores = new Filme("Vingadores", 2012, "Ação", "Joss Whedon", ["Robert Downey Jr.", "Chris Evans"], 120);

Hulk.Reproduzir();
Hulk.Pausar();

Hulk.ficha();
Vingadores.ficha();