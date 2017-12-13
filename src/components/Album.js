import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      currentVolume: 0.5,
      duration: album.songs[0].duration,
      isPlaying: false,
      songListOpen: false,
      isDragging: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount(){
    this.eventListeners = {
      timeupdate: e => {
        this.setState({currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({duration: this.audioElement.duration});
      },
      ended: () => {
        this.onEnd();
      }
    };

    this.audioElement.addEventListener('timeupdate',this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('ended',this.eventListeners.ended);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('ended',this.eventListeners.ended);
  }


  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    }else{
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
    const newIndex = Math.max(0, currentIndex-1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex+1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime || 0;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  formatTime(time) {
    if(isNaN(time)){return "-:--";}
    const minutes = Math.floor(time/60);
    const seconds = ("0" + Math.round(time%60)).slice(-2);
    return `${minutes}:${seconds}`;
  }

  openSesame() {
    const list = document.getElementsByClassName('song-list')[0];
    const arrow = document.getElementsByClassName('slide-arrow')[0];

    if(this.state.songListOpen===false){
      list.classList.add('show-list');
      arrow.classList.add('slide-arrow-open');

      this.setState({ songListOpen: true });
    }else{
      list.classList.remove('show-list');
      arrow.classList.remove('slide-arrow-open');

      this.setState({ songListOpen: false });
    }
  }

  autoAdvance(){
    const currentIndex = this.state.album.songs.findIndex(song => song === this.state.currentSong);
    if(currentIndex < this.state.album.songs.length-1){
      this.handleNextClick();
    }else{
      this.setSong(this.state.album.songs[0]);
      this.pause();
    }
  }

  onEnd(){
    if(!this.state.isDragging){
      this.autoAdvance();
    }
  }

  onDrag(){
    this.setState({ isDragging: true });
  }

  onNoDrag(e){
    this.setState({ isDragging: false });

    if(this.state.currentTime >= this.state.duration){
      this.autoAdvance();
    }else{
      this.play();
    }
  }


  render() {
    return (
      <main id="player-skin">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="{this.state.album.title}" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>

        <section id="lower-player-skin">
          <section id="controls">
            <section id="current-song">
              <p id="current-song-title">{this.state.currentSong.title}</p>
              <p id="current-song-artist">{this.state.album.artist}</p>
            </section>

            <PlayerBar isPlaying={this.state.isPlaying}
                       currentSong={this.state.currentSong}
                       currentTime={this.audioElement.currentTime}
                       duration={this.audioElement.duration}
                       currentVolume={this.state.currentVolume}
                       handleSongClick={(s) => this.handleSongClick(this.state.currentSong)}
                       handlePrevClick={() => this.handlePrevClick()}
                       handleNextClick={() => this.handleNextClick()}
                       handleTimeChange={(e) => this.handleTimeChange(e)}
                       handleVolumeChange={(e) => this.handleVolumeChange(e)}
                       autoAdvance={() => this.autoAdvance()}
                       formatTime={(t) => this.formatTime(t)}
                       onDrag={() => this.onDrag()}
                       onNoDrag={(e) => this.onNoDrag(e)}
            />
          </section>
          <section id="song-list-container">
            <div id="arrow-container">
              <div className="slide-arrow" classlist="none" onClick={() => this.openSesame()}></div>
            </div>

            <table className="song-list">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
                {
                  this.state.album.songs.map( (song, index) =>
                    <tr className={this.state.currentSong.title === song.title && this.state.isPlaying ? 'song-playing hide-number' : 'song-not-playing' } key={index} onClick={() => this.handleSongClick(song)} >
                      <td className="song-actions">
                        <button>

                          <span className={this.state.currentSong.title === song.title && this.state.isPlaying ? 'no-track-number' : 'track-number' }>{index + 1}</span>
                          <span className={this.state.currentSong.title === song.title && this.state.isPlaying ? 'ion-pause td-pause' : 'ion-play ion-play-button' }></span>

                        </button>
                      </td>
                      <td id="song-title-cell">{song.title}</td>
                      <td id="song-duration-cell">{this.formatTime(song.duration)}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </section>
        </section>
      </main>
    );
  }
}

export default Album;
