import Sequelize from 'sequelize';

const connection = new Sequelize("pergunta", "root", "devviniciuslima", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "-04:00"
});

export default connection;