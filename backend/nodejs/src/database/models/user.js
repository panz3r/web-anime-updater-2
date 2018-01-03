import Sequelize from 'sequelize'

export const User = (sequelize) => sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: 'usernameUnique'
  },
  password: {
    type: Sequelize.STRING
  }
})