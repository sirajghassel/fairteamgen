import React from 'react';
import axios from 'axios'
class Event extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        event_info: {},
        event_players: [],
        player_name: "",
        player_age: "",
        player_skill: "",
        player_frequency: "",
        teams: [],
        players: []
      }
    }

    componentDidMount = () => {
      this.getEventInfo()
      this.getEventPlayers()
    }

    getEventPlayers = () => {
      axios.get("/api/players/"+this.props.match.params.eventpin).then(
        response => {
          console.log(response.data)
          this.handlePlayers(response.data)
        }
      )
    }

    handlePlayers = (players) => {
      const max_teams = this.state.event_info.max_teams
      players.forEach((player, player_index) => {
        players[player_index]['score'] = Number((player['age'] + player['skill'] + player['frequency']) / 3)

      })
      delete player
      players.sort(function(a, b){
        var keyA = a.score,
            keyB = b.score;
        // Compare the 2 dates
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
      })
      delete a,b

      let team_aggregate = [0,0]
      let teams = [
        [],
        []
      ]
      // for (let team_index = 0; team_index < max_teams; team_index++) {
      //   team_aggregate[team_index] = 0
      //   teams[team_index] = []
      // }
      for(let player_i = 0; player_i < players.length; player_i++){
        let index = team_aggregate.indexOf(Math.min(...team_aggregate))
        let player = players.shift()
        team_aggregate[index] += player.score
        teams[index].push(player)
      }
      this.setState({players: players})
      this.setState({teams: teams})
    }

    getEventInfo = () => {
      axios.get("/api/events/"+this.props.match.params.eventpin).then(
        response => {
          this.setState({event_info: response.data})
        }
      )
    }

    playersTable = () => {
      return (
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Skill</th>
              <th>Frequency</th>
              <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.players.map(player => (
              <tr key={player.player_id}>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.skill}</td>
                <td>{player.frequency}</td>
                <td>{player.score}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      )
    }

    hanldePlayerNameChange = (event) => {
      event.preventDefault()
      this.setState({player_name: event.target.value})
    }

    handleAgeChange = (event) => {
      event.preventDefault()
      this.setState({player_age: event.target.value})
    }

    handleFrequencyChange = (event) => {
      event.preventDefault()
      this.setState({player_frequency: event.target.value})
    }

    handleSkillChange = (event) => {
      event.preventDefault()
      this.setState({player_skill: event.target.value})
    }

    submitPlayer = (event) => {
      event.preventDefault()

      axios.post("/api/players/" + this.props.match.params.eventpin, {
        name: this.state.player_name,
        age: this.state.player_age,
        skill: this.state.player_skill,
        frequency: this.state.player_frequency,
      }).then(
        response => {
          console.log(response.data)
        }
      )
    }

    playersForm = () => {
      return(
        <form>
           <div className="row">
            <div className="col s3">
              <div className="input-field col s12">
                <input value={this.state.player_name} onChange={this.hanldePlayerNameChange} type="text" className="validate" />
                <label>Player Name</label>
              </div>
            </div>
            <div className="col s3">
              <label>Select Your Age</label>
              <select defaultValue="" onChange={this.handleAgeChange} className="browser-default">
                <option value="" disabled>Choose your age group</option>
                <option value="1">less than 12</option>
                <option value="2">12-13</option>
                <option value="3">14-15</option>
                <option value="4">16-18</option>
                <option value="5">18-25</option>
                <option value="4">25-33</option>
                <option value="3">34-40</option>
                <option value="2">41-47</option>
                <option value="1">greter than 47</option>
              </select>
            </div>
            <div className="col s3">
              <label>How often do you play?</label>
              <select defaultValue={""}  onChange={this.handleFrequencyChange} className="browser-default">
                <option value="" disabled>Choose your playing frequency</option>
                <option value="5">weekly</option>
                <option value="4">biweekly</option>
                <option value="3">once a month</option>
                <option value="2">played once in the last two months</option>
                <option value="1">I haven't played in two months or more</option>
              </select>
            </div>
            <div className="col s3">
              <label>What is your skill level?</label>
              <select defaultValue={""} onChange={this.handleSkillChange} className="browser-default">
                <option value="" disabled>Choose your skill level</option>
                <option value="5">semipro</option>
                <option value="4">very well</option>
                <option value="3">okay</option>
                <option value="2">basic</option>
                <option value="1">new to the sport</option>
              </select>
            </div>
          </div>
          <div className="row">
             <div className="input-field col s12">
               <button onClick={this.submitPlayer} className="waves-effect waves-light btn">Submit</button>
             </div>
          </div>
        </form>
      )
    }

    eventTable = () => {
      return(
        <table>
        <thead>
          <tr>
              <th>Event link</th>              
              <th>Event Notes</th>
              <th>Max Players</th>
              <th>Max Teams</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><a href={window.location.origin + "/event/" + this.props.match.params.eventpin}>
                {window.location.origin}/event/{this.props.match.params.eventpin}
               </a></td>
            <td>{this.state.event_info.notes}</td>
            <td>{this.state.event_info.max_players}</td>
            <td>{this.state.event_info.max_teams}</td>
          </tr>
        </tbody>
      </table>
      )
    }

    render(){
      console.log()
      return (
        <div>
          {this.eventTable()}
          {this.playersForm()}
          {this.playersTable()}
        </div>
      );
    }
}

export default Event;
