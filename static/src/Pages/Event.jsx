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
        event_exists: null,
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
          this.handlePlayers(response.data)
        }
      )
    }

    handlePlayers = (players) => {
      const max_teams = this.state.event_info.max_teams
      
      players.forEach((player, player_index) => {
        players[player_index]['score'] = Number((player['age'] + player['skill'] + player['frequency']) / 3)
      })

      players.sort(function(a, b){
        var keyA = a.score,
            keyB = b.score;
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
      })

      let team_aggregate = [0,0]
      let teams = [
        [],
        []
      ]

      for (let team_index = 0; team_index < max_teams; team_index++) {
        team_aggregate[team_index] = 0
        teams[team_index] = []
      }
      
      const length = players.length
      const roster = []
      for(let player_i = 0; player_i < length; player_i++){
        let index = team_aggregate.indexOf(Math.min(...team_aggregate))
        let player = players.shift()
        team_aggregate[index] += player.score
        teams[index].push(player)
        roster.push(player)
      }
      this.setState({players: roster})
      this.setState({teams: teams})
    }

    getEventInfo = () => {
      axios.get("/api/events/"+this.props.match.params.eventpin).then(
        response => {
          this.setState({event_info: response.data})
        }
      ).catch(error => {
        if(error.response.status === 404){
          window.location.href = window.location.origin
          this.setState({event_exists: false})
        }
      })
    }

    teamTable = (team) => {
      let team_aggregate = 0
      team.forEach(player => {
        team_aggregate += player.score
      })
      return (
        <div className="col s3">
          <table className="team-table">
            <thead>
              <tr>
                  <th>Name</th>
                  {/* <th>Age</th>
                  <th>Skill</th>
                  <th>Frequency</th> */}
                  <th>Score</th>
              </tr>
            </thead>

            <tbody>
              {
                team.map(player => (
                  <tr key={player.player_id}>
                    <td>{player.name}</td>
                    {/* <td>{player.age}</td>
                    <td>{player.skill}</td>
                    <td>{player.frequency}</td> */}
                    <td>{Math.round(player.score * 100) / 100}</td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <th><b>Team Score: </b></th>
                <th><b>{Math.round(team_aggregate * 100) / 100}</b></th>
              </tr>
            </tfoot>
          </table>
        </div>
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
          this.getEventPlayers()
        }
      )
    }

    playersForm = () => {
      return(
        <form>
           <div className="row">
            <div className="input-field">
              <input value={this.state.player_name} onChange={this.hanldePlayerNameChange} type="text" className="validate" />
              <label>Player Name</label>
            </div>
            <div>
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
            <div>
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
            <div>
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
            <div>
            <div className="input-field">
                <button onClick={this.submitPlayer} className="waves-effect waves-light btn">Submit</button>
            </div>
         </div>
          </div>
        </form>
      )
    }

    eventTable = () => {
      return(
        <div className="row">
          <div className="col s12">
            <table>
              <thead>
              </thead>
              <tbody>
                <tr>
                  <td><b>Event Link: </b></td>
                  <td>
                    <a href={window.location.origin + "/event/" + this.props.match.params.eventpin}>
                      {window.location.origin + "/event/" + this.props.match.params.eventpin}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td><b>Max. Teams: </b></td>
                  <td>{this.state.event_info.max_teams}</td>
                </tr>
                <tr>
                  <td><b>Max. PLayers: </b></td>
                  <td>{this.state.event_info.max_players}</td>
                </tr>
                <tr>
                  <td><b>Event Notes: </b></td>
                  <td>{this.state.event_info.notes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    render(){

      return (
        <div>
          <div className="row">
            <div className="col s6">
              <h4>Event Info</h4>
              {this.eventTable()}
            </div>
            <div className="col s6">
              <h4>Add a Player</h4>
              {this.playersForm()}
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h4>Sorted Teams</h4>
            </div>
            {
              this.state.teams.map((team, i) => (
                <div key={i}>
                  {this.teamTable(team)}
                </div>
              ))
            }
          </div>
        </div>
      );
    }
}

export default Event;
