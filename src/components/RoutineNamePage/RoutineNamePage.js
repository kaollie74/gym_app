import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoutineNamePage.css';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto'
  },
  gridList: {
    width: 1000,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    paddingLeft: 10
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});


class RoutineNamePage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ROUTINE_NAMES' })
  }

  state = {
    routineName: '',
    day: ''
  }

  // Handles setting a new Routine name and running a dispatch to 
  // post it in the DB
  handleSubmit = (event) => {
    event.preventDefault();
    // run dispatch 
    this.props.dispatch({ type: 'SET_ROUTINE_NAME', payload: this.state })

    this.setState({
      routineName: '',
      day: ''
    })
  } // end handleSubmit



  handleChange = (event, propsName) => {
    this.setState({
      [propsName]: event.target.value,

    })
  }

  // retrieves single routine by its 'id' and runs a dispatch
  // which will eventually place it into its own reducer.
  handleRoutine = (item) => {
    console.log('IN handle Routine', item)

    this.props.dispatch({ type: 'RETRIEVE_SINGLE_ROUTINE', payload: item.id });

    this.props.history.push('/routine')


  }


  render() {
    const { classes } = this.props;


    console.log('this.state', this.state);

    return (
      <>
        <h1 className="routineTitle">Build Routine Name and Day</h1>

        <form className="buildRoutineForm">
          <input type='text' placeholder='Routine Name' value={this.state.routineName} onChange={(event) => this.handleChange(event, 'routineName')} />

          <select value={this.state.day} onChange={(event) => this.handleChange(event, 'day')} >
            <option value='default'>Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        <GridList cellHeight={200} spacing={5} className={classes.gridList}>
          {this.props.reduxStore.routineNames.map(item => (
            <GridListTile key={item.id} cols={1} rows={1}>
              <img src='/images/weights.jpg' alt='plates' onClick={() => this.handleRoutine(item)} />
              <GridListTileBar
                
                title={item.routineName}
                titlePosition='top'
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition='left'
                className={classes.titleBar}
              />




            </GridListTile>

          ))}
        </GridList>
      </>
    )
  }
}

const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore
})



export default withStyles(styles)(connect(mapReduxStoreToProps)(RoutineNamePage));