import Sequelize from 'sequelize';
import connection from './database.js';

const Pergunta = connection.define("pergunta", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({ force: false }).then(() => {
  console.log("Tabela criada com sucesso");
}).catch((erro) => {
  console.log("ops... deu erro: " + erro);
})

export default Pergunta