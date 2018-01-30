import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import SubscriptionsIcon from 'material-ui-icons/Subscriptions'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'

import { SeriesPage } from './subpages'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth
  },
  drawerHeader: {
    ...theme.mixins.toolbar
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    overflow: 'scroll',
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }
})

class MainPage extends Component {
  state = {
    open: false
  }

  handleDrawer = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar disableGutters={true}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawer}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Web Anime Updater 2
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader} />
              <Divider />
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>
                    <SubscriptionsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Series" />
                </ListItem>
              </List>
              <Divider />
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Switch>
              <Route exact path="/series" component={SeriesPage} />
              <Redirect to="/series" />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MainPage)
