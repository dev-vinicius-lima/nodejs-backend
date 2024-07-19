import Sequelize from "sequelize"
import dotenv from "dotenv"



const connection = new Sequelize("first-api", "root", "devviniciuslima", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "-03:00"
})

export default connection

