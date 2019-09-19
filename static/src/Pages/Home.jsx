import React from 'react'
import axios from 'axios'

class Home extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        notes: "",
        max_teams: "",
        max_players: "",
        event_pin: null,
        check_event_pin: "",
        event_exists: null
      }
    }

    handleNotesChange = (event) => {
      this.setState({notes: event.target.value})
    }

    hanldeMaxTeamChange = (event) => {
      this.setState({max_teams: event.target.value})
    }

    hanldeMaxPlayersChange = (event) => {
      this.setState({max_players: event.target.value})
    }

    submitEvent = (event) => {
      event.preventDefault()
      axios.post("/api/events", {
        notes: this.state.notes,
        max_teams: this.state.max_teams,
        max_players: this.state.max_players
      }).then(
        response => {
          this.setState({event_pin: response.data['event_pin']})
        }
      )
    }

    createForm = () => (
      <form>
        <div className="row">
          <div className="input-field col s12">
             <textarea value={this.state.notes} onChange={this.handleNotesChange} rows="4" id="icon_prefix2" className="materialize-textarea event-notes"></textarea>
            <label htmlFor="notes">Notes</label>
          </div>
        </div>
        <div className="row">
           <div className="input-field col s12">
             <input value={this.state.max_teams} onChange={this.hanldeMaxTeamChange} id="max_teams" type="number" className="validate" />
             <label htmlFor="max_teams">Amount of Teams</label>
           </div>
        </div>
        <div className="row">
           <div className="input-field col s12">
             <input value={this.state.max_players} onChange={this.hanldeMaxPlayersChange} id="max_players" type="number" className="validate" />
             <label htmlFor="max_players">Max. Players For Each Team</label>
           </div>
        </div>
        <div className="row">
           <div className="input-field col s12">
             <button onClick={this.submitEvent} className="waves-effect waves-light btn">Create</button>
           </div>
        </div>

      </form>
    )

    confirmMessage = () => {
      if(this.state.event_pin){
        return(
          <div className="col s12">
            <div className="card-panel teal">
              <span className="white-text">
               <i className="material-icons">check_circle</i>
               EVENT CREATED
               Here is the link
               <br/>
               <a href={window.location.origin + "/event/" + this.state.event_pin}>
                {window.location.origin}/event/{this.state.event_pin}
               </a>
              </span>
            </div>
          </div>
        )
      }
    }

    eventDoesNotExist = () => {
      if(this.state.event_exists === false){
        return(
          <div className="row">
            <div className="col s12">
            <div className="card-panel teal">
              <span className="white-text">
               <i className="material-icons">cancel</i>
               &nbsp;&nbsp;&nbsp;
               Event Does not Exist!
              </span>
            </div>
          </div>
          </div>
        )
      }
    }

    hanldeCheckEventPin = (e) => {
      e.preventDefault()
      this.setState({check_event_pin: e.target.value})
    }

    checkEvent = (e) => {
      e.preventDefault()
      axios.get("/api/events/" + this.state.check_event_pin).then(response => {
        window.location.href = window.location.origin + "/event/" + this.state.check_event_pin
      }).catch(error => {
        if(error.response.status === 404){
          this.setState({event_exists: false})
        }

      })
    }

    checkEventForm = () => (
      <div>
        <form>
          <div className="input-field">
              <input value={this.state.check_event_pin} onChange={this.hanldeCheckEventPin} type="text" className="validate" />
              <label>Event PIN</label>
          </div>
           <div className="input-field">
             <button onClick={this.checkEvent} className="waves-effect waves-light btn">Check</button>
           </div>
        </form>
      </div>
    )

    render = () => {
      return (
        <div className="event">
          <div className="row">
            <div className="col s6">
              <h4>Create an Event</h4>
              {this.confirmMessage()}
              {this.createForm()}
            </div>
            <div className="col s6">
              <h4>Already have an event?</h4>
              {this.eventDoesNotExist()}
              {this.checkEventForm()}
            </div>
         </div>
        </div>
      );
    }
}

export default Home;
