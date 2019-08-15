import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoutineNamePage.css';

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';





const styles = theme => ({
  card: {
    background: 'gray',
    margin: 0
  },
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
    paddingLeft: 140
  },
  routines: {
    width: 200,
    marginLeft: 150,
    marginBottom: 20
  },
  routineText: {
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    fontSize: 48,
    textAlign: 'center'
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

  // on page load run two dispatches
  // 1. will fetch routines that have been created
  // 2. will fetch images and store in the image reducers
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ROUTINE_NAMES' })
    this.props.dispatch({ type: 'FETCH_IMAGES' })
  }

  state = {
    routineName: '',
    day: '',
    image: '',
    edit: false
  }

  // conditional render buttons depending of if this.state.edit is
  // false or true
  checkEdit = () => {
    if (this.state.edit === false) {
      return (
        <>
          <button onClick={(item) => this.handleSubmit(item)}>Submit</button>
        </>
      )// end return
    } else {
      return (
        <>
          <button onClick={(item) => this.updateSubmit(item)}>update</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </>
      )// end return 
    } // end else
  }// end checkEdit

  // if cancel button is clicked, reset state to empty values and
  // edit to false
  handleCancel = () => {
    this.setState({
      routineName: '',
      day: '',
      image: '',
      edit: false
    })
  }

  // Handles setting a new routine name and running a dispatch to 
  // post it in the DB
  handleSubmit = (event) => {
    event.preventDefault();
    // run dispatch 
    this.props.dispatch({ type: 'SET_ROUTINE_NAME', payload: this.state })

    this.setState({
      routineName: '',
      day: '',
      image: ''

    })
  } // end handleSubmit

  // captures the values from the input field and
  // drop down menu
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
    this.props.history.push(`/routine`)
  } // end handleRoutine


  // If edit button is clicked. The input fields will 
  // populate with those values by setting state to them
  handleRoutineNameEdit = (item) => {
    console.log('In handleRoutineNameEdit', item);
    this.setState({
      routineName: item.routineName,
      day: item.day,
      id: item.id,
      image: item.image,
      edit: true
    })
  } // end handleRoutineNameEdit

  // When update button is clicked, run a dispatch with this.state as payload
  // Then reset state to empty values and edit to false. 
  updateSubmit = () => {
    console.log('in update submit', this.state)
    this.props.dispatch({ type: 'UPDATE_ROUTINE_NAME', payload: this.state })

    this.setState({
      routineName: '',
      day: '',
      image: '',
      edit: false
    })
  }

  render() {
    const { classes } = this.props;
    console.log('this.state', this.state)

    return (
      <>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.text}>
              Build Routine
              </Typography>
          </CardContent>
        </Card>

        <form className="buildRoutineForm">
          <input type='text' placeholder='Routine Name' value={this.state.routineName} onChange={(event) => this.handleChange(event, 'routineName')} />
          <input type='text' placeholder='image' value={this.state.image} onChange={(event) => this.handleChange(event, 'image')}/>
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
          {/* <button onClick={this.handleSubmit}>Submit</button> */}
          {this.checkEdit()}
        </form>
        {/* <Card className={classes.routines}>
          <CardContent>
            <Typography className={classes.routineText}>
              Current Routines
              </Typography>
          </CardContent>
        </Card> */}

        <GridList cellHeight={200} spacing={5} className={classes.gridList}>
          {this.props.reduxStore.routineNames.map(item => (
            <GridListTile key={item.id} cols={1} rows={1}>
              <img src={item.image ? item.image : 'images/weights.jpg'} alt='plates' onClick={() => this.handleRoutine(item)} />
              <GridListTileBar
                title={item.routineName}
                titlePosition='top'
                actionIcon={
                  <IconButton className={classes.icon}>
                    <EditIcon onClick={() => this.handleRoutineNameEdit(item)} />
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