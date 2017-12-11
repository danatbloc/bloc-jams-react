import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render(){
    return(
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>
          <div className="album-library-info">
            <Link to={`/album/${album.slug}`} key={index}>
              <img src={album.albumCover} alt={album.title} />
                <h1 id="library-album-title">{album.title}</h1>
                <h2 id="library-album-artist">{album.artist}</h2>
            </Link>
          </div>
          )
        }
      </section>
    );
  }
}


export default Library;
