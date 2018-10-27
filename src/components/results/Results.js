import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Results extends Component {
  render() {

    let imageContentList;
    const {images} = this.props;

    if(images) {
        imageContentList = (
            <GridList cols={3}>
                {images.map(img => (
                    <GridTile 
                        key={img.id}
                        title={img.tags}
                        subtitle={
                            <span>
                                by <strong>{img.user}</strong>
                            </span>
                        }
                        actionIcon={
                            <IconButton>
                                <ZoomIn color="white"/>
                            </IconButton>
                        }
                        >
                        <img src={img.largeImageURL} />
                    </GridTile>
                ))}  
            </GridList>
        );
    } else {
        imageContentList = null;
    }

    return (
      <div>
        {imageContentList}
      </div>
    )
  }
}

Results.propTypes = {
    images : PropTypes.array.isRequired
}

export default Results;
