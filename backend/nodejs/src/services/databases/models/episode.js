import Sequelize from 'sequelize'

export const Episode = sequelize =>
  sequelize.define('episode', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    number: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING,
      unique: 'episodeUrl'
    }
  })
