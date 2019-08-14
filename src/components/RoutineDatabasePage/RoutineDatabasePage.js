import React, {Component} from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class RoutineDatabasePage extends Component {
  render(){
    return (
      <div>
        <div>
        <p>
            Gyms Nearby
        </p>
        </div>
      </div>
    )
  }
}
  


export default RoutineDatabasePage;
