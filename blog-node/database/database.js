import Sequelize from "sequelize";
const connection = new Sequelize("blog-node", "root", "devviniciuslima", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
  logging: false
})

export default connection