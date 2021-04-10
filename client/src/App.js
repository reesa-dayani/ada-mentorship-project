import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Liked from './components/Liked'
import Playlists from './components/Playlists'
import SpotifyWebApi from 'spotify-web-api-js';
import Button from './components/Button';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      gotLatestLiked: token ? true : false,
      latestLiked: [],
      songIDs: [],
      features: []
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }


  getSavedTracks() {
    spotifyApi.getMySavedTracks()
      .then((response) => {
        this.setState({
          latestLiked: response.items,
          gotLatestLiked: true
        });
        return response;
      }).then((response) => {
        var ids = [];
        response.items.map((item) => {
          ids.push(item.track.id.trim())
        });
        this.songIDs = ids;
        console.log(this.songIDs);
        return ids;
      })
  }

  getAudioFeatures() {
    spotifyApi.getAudioFeaturesForTracks(this.songIDs)
      .then((response) =>
        this.setState({
          features: response.audio_features
        }));
  }


  render() {
    var items = this.state.latestLiked.map((item) =>
      <li key={item.track.id}>{item.track.name}</li>
    );

    if (this.state.features.length > 0) { // This error handling doesn't work for some reason.
      var features = this.state.features.map((track) =>
        <li key={track.id}>Energy: {track.energy}, Loudness:{track.loudness}, Tempo:{track.tempo}</li>
      );
      console.log(this.state.features);
    } else {
      <li>No tracks to analyze</li>
    }


    return (
      <Router>
        <div className="container">
          <Header />
          <div style={{ textAlign: 'center', margin: 10 }}>
            <a href='http://localhost:8888/login' > LOGIN WITH SPOTIFY </a>
          </div>
          <div></div>
          <Route path='liked' component={Liked} />
          {this.state.loggedIn &&
            <Button text="LATEST LIKED SONGS"
              onClick={() => this.getSavedTracks()}
            />
          }
          
          <ol>
            <strong>Latest liked songs:</strong>
            {items}
          </ol>

          <Route path='playlists' component={Playlists} />
          {this.state.loggedIn &&
            <Button text="AUDIO FEATURES"
              onClick={() => this.getAudioFeatures()} />
          }

          <ol>
            <strong>Track analysis for songs:</strong>
            {features}
          </ol>
          <Route path='/home' component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;