const db = [{ name: "João", email: "joao@dio.com" }]

class UserService {
  createUser = (name: string, email: string) => {
    const user = {
      name,
      email,
    }
    db.push(user)
    console.log("DB atualizado! ", db)
  }

  getAllUsers = () => {
    return db
  }
}

export default new UserService()
