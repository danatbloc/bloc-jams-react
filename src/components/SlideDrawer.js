import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

class SlideDrawer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawerHeight: 0,
      songListOpen: false
    };

  }

  toggleDrawer = () => {
    this.state.drawerHeight === "auto" ? this.setState({ drawerHeight: 0 }) : this.setState({ drawerHeight: 'auto' })

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

  render() {
    return (
      <div>
        <div id="arrow-container">
          <div className="slide-arrow" classlist="none" onClick={this.toggleDrawer} ></div>
        </div>

        <AnimateHeight
          duration={ 225 }
          height={ this.state.drawerHeight }
          className={ 'song-list-container' }
          contentClassName={ 'song-list' }

        >

        <section className="song-list-container">


          <table className="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
              {
                this.props.songList.map( (song, index) =>

                  <tr className={this.props.currentSong.title === song.title && this.props.isPlaying ? 'song-playing hide-number' : 'song-not-playing' } key={index} onClick={() => this.props.handleSongClick(song)} >
                    <td className="song-actions">
                      <button>

                        <span className={this.props.currentSong.title === song.title && this.props.isPlaying ? 'no-track-number' : 'track-number' }>{index + 1}</span>
                        <span className={this.props.currentSong.title === song.title && this.props.isPlaying ? 'ion-pause td-pause' : 'ion-play ion-play-button' }></span>

                      </button>
                    </td>
                    <td id="song-title-cell">{song.title}</td>
                    <td id="song-duration-cell">{this.props.formatTime(song.duration)}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </section>


        </AnimateHeight>
      </div>
    );
  }
}


export default SlideDrawer;
