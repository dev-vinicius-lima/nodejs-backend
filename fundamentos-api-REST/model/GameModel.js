import { Sequelize } from 'sequelize'
import connection from '../db.js'

const GameModel = connection.define('games', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

// await GameModel.sync({ force: true });
// console.log('The table for the User model was just (re)created!');

export default GameModel

