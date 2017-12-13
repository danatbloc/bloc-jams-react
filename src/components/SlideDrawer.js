import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';

class SlideDrawer extends Component {
  render() {
    return (
      <AnimateHeight
        duration={ 500 }
        height={ 'auto' }
        className={ 'song-list-container' }
        contentClassName={ 'song-list' }

      >

      <section id="song-list-container">
        <div id="arrow-container">
          <div className="slide-arrow" classlist="none" onClick={() => this.onClick()} ></div>
        </div>

        <table className="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.props.songList.map( (song, index) =>
                <tr className={this.props.currentSong.title === song.title && this.props.isPlaying ? 'song-playing hide-number' : 'song-not-playing' } key={index} onClick={this.props.handleSongClick} >
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


        <p>Put as many React or HTML components here.</p>
      </AnimateHeight>
    );
  }
}


export default SlideDrawer;
