import Sequelize from "sequelize";
import connection from "../database/database.js";
import Category from '../categories/Category.js';

const Article = connection.define("article", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Category.hasMany(Article); // 1 p m
Article.belongsTo(Category); // 1 p 1

// Article.sync({ force: true });


export default Article;