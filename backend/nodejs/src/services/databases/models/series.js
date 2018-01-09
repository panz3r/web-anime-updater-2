import Sequelize from 'sequelize'

export const Series = (sequelize) => sequelize.define('serie', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    unique: 'seriesUrl'
  },
  posterUrl: {
    type: Sequelize.STRING
  },
})