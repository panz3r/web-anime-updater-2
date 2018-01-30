import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import InfoIcon from 'material-ui-icons/Info'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  }
})

class SerieListComponent extends Component {
  render() {
    const { classes, list, loading } = this.props

    if (loading) {
      return <CircularProgress />
    }

    return (
      <GridList cellHeight={250} cols={2} className={classes.gridList}>
        {list &&
          list.map(element => (
            <GridListTile key={element.id}>
              <img src={element.posterUrl} alt={element.title} />
              <GridListTileBar
                title={element.title}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    )
  }
}

export default withStyles(styles)(SerieListComponent)
