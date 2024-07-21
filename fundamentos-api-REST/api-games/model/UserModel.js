import Sequelize from "sequelize"
import connection from "../db.js"

const UserModel = connection.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default UserModel

// await User.sync({ force: true });
// console.log('The table for the User model was just (re)created!');