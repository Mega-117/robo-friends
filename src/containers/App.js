import { Component } from "react";
import Cardlist from "../components/Cardlist";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfiled: "",
    };
  }

  //aggiungo chiamata fetch e salvo il tutto nello stato "robots"
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) })
  }

  onSearchChange = (e) => {
    this.setState({ searchfiled: e.target.value });
  };

  render() {
    const { robots, searchfiled } = this.state;
    //funzione filtro
    const filterRobots = robots.filter((robot) => {
      //ritorna un NUOVO array degli elementi conteneti il nome del robot uguali a valore inserito nella ricerca
      return robot.name
        .toLowerCase()
        .includes(searchfiled.toLocaleLowerCase());
    });
    //facendo così avremo non verrà "intaccato" l array originale con tutti i robot (ma creato una a parte solo per i filtri)


    //aggiungo il loading
    return !robots.length ?
      <h1 className="tc">Loading</h1>
      :
      (
        <div className="tc">
          <h1 className="f1">Robots Friendsd</h1>
          <SearchBox onSearchChange={this.onSearchChange} />
          <Scroll>
            <Cardlist robots={filterRobots} />
          </Scroll>
        </div>
      );
  }
}

export default App;
