import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import { SeriesService } from '../../../../services'
import {
  userSeriesLoaded,
  userSeriesLoading,
  getUserSeries,
  isLoadingUserSeries
} from '../../../../state/user'
import {
  serieListLoaded,
  serieListLoading,
  getSerieList,
  isLoadingSerieList
} from '../../../../state/series'
import { SerieListComponent } from './components'

const styles = theme => ({
  section: {
    marginTop: 16
  }
})

class SeriesPage extends Component {
  constructor(props) {
    super(props)
    this.seriesService = new SeriesService()
  }

  componentDidMount() {
    const {
      serieListLoaded,
      serieListLoading,
      userSeriesLoading,
      userSeriesLoaded
    } = this.props

    userSeriesLoading()
    this.seriesService.getUserSeries().then(ul => {
      console.log('user serie list', { ul })
      userSeriesLoaded(ul)
    })

    serieListLoading()
    this.seriesService.getAllSeries().then(al => {
      console.log('serie list', { al })
      serieListLoaded(al)
    })
  }

  render() {
    const {
      classes,
      allSeries,
      userSeries,
      loadingAllSeries,
      loadingUserSeries
    } = this.props

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.mainGrid}
        spacing={0}
      >
        <Grid item xs={10} sm={7} className={classes.section}>
          {userSeries &&
            userSeries.length > 0 && (
              <Typography type="headline" color="inherit">
                My Series
              </Typography>
            )}

          <SerieListComponent list={userSeries} loading={loadingUserSeries} />
        </Grid>

        <Grid item xs={10} sm={7} className={classes.section}>
          <Typography type="headline" color="inherit" className={classes.flex}>
            All Series
          </Typography>

          <SerieListComponent list={allSeries} loading={loadingAllSeries} />
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  userSeriesLoaded,
  userSeriesLoading,
  serieListLoaded,
  serieListLoading
}

const mapStateToProps = state => ({
  userSeries: getUserSeries(state),
  loadingUserSeries: isLoadingUserSeries(state),
  allSeries: getSerieList(state),
  loadingAllSeries: isLoadingSerieList(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SeriesPage)
)
