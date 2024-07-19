class Leitor {
  Ler(nome) {
    console.log(`Lendo o arquivo ${nome}`);
  }
}

class Escritor {
  Escrever(arquivo, conteudo) {
    console.log(`Escrevendo o arquivo ${conteudo}`);
  }
}

class Criador {
  Criar(nome) {
    console.log(`Criando o arquivo ${caminho}`);
  }
}

class Deletor {
  Deletar(nome) {
    console.log(`Deletando o arquivo ${nome}`);
  }
}

class ManipuladorDeArquivo {
  constructor(nome) {
    this.arquivo = nome;
    this.leitor = new Leitor();
    this.escritor = new Escritor();
    this.criador = new Criador();
    this.deletor = new Deletor();
  }




}

const manipulador = new ManipuladorDeArquivo('arquivo.txt');
manipulador.escritor.Escrever('arquivo.txt', 'conteudo');

export default ManipuladorDeArquivo