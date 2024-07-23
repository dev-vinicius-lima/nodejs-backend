const database = require('./database')

// insert de dados

// const dados = [
//   {
//     nome: 'Call of duty',
//     preco: 150.00,
//   },
//   {
//     nome: 'Fifa',
//     preco: 200.00,
//   },
//   {
//     nome: 'PUBG',
//     preco: 250.00,
//   },
//   {
//     nome: 'Fortnite',
//     preco: 300.00,
//   }

// ]
// database.insert(dados).into("games").then(data => {
//   console.log(data)
// }).catch(err => console.log(err))


// >>>>>>>>>> select de dados

// database.select("*").from("games").then(data => {
//   console.log(data)
// }).catch(err => console.log(err))

// >>>>>>>>>> insert and select in one query

// database.insert({ nome: 'Call of duty ||', preco: 100.00 }).into("games").then(data => {
//   database.select("*").from("games").then(data => {
//     console.log(data)
//   }).catch(err => console.log(err))
// }).catch(err => console.log(err))


// >>>>>>>>>> update de dados
// database.where({ nome: 'Fifa' }).update({ preco: 120.00 }).from("games").then(data => {
//   console.log(data)
// }).catch(err => console.log(err))

// >>>>>>>>>> delete de dados
// database.where({ nome: 'PUBG' }).del().from("games").then(data => {
//   console.log(data)
// }).catch(err => console.log(err))