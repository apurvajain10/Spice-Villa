import React, { Component } from "react";
import axios from "axios";


export default class Restaurant extends Component {
  state = {
    qfood: "",
    restaurants: []
  };
  handleChange = event => {
    this.setState({ qfood: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const api_key = "ff07cad25b017ccfe596400d0f865c4d";
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?q=` + this.state.qfood,
        {
          headers: {
            "Accept": "application/json",
            "user-key": "cacaf9c1dd104bc7bff8c7c770a97d0e"
          }
        }
      )
      .then(res => {
        this.setState({ restaurants: res.data.restaurants });
        console.log(res.data.restaurants);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SPICE-VILLA</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input
            
            className="search-bar"
            type="text"
            name="qfood"
            placeholder="Search for Restaurants and dishes"
            width="40px"
            height="21vh"
            onChange={this.handleChange}
          />
          <button className="search-button" type="submit"  >
            Search
          </button>
        </form>
        <ul>
          {this.state.restaurants.map(restaurant=>
             <li key={restaurant.restaurant.id}>
                 {restaurant.restaurant.name} &nbsp;&nbsp;<br/>
                 Available : &nbsp;{restaurant.restaurant.cuisines}&nbsp;&nbsp;&nbsp;
                 Open :      &nbsp;{restaurant.restaurant.timings} &nbsp; &nbsp;&nbsp;
                 Ratings :   &nbsp;{restaurant.restaurant.user_rating.aggregate_rating}&nbsp; &nbsp; &nbsp;
                 {restaurant.restaurant.user_rating.rating_text}<br/><br/>

            </li>
            
            
          )}
        </ul>
      </div>
    );
  }
}
