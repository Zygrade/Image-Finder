import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Results extends Component {

    state = {
        open : false,
        currentImg : ''
    };

    handleOpen = (img) => {
        this.setState({currentImg : img, open:true});
    }

    handleClose = () => {
        this.setState({open : false});
    }

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
                                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                                    <ZoomIn color="white"/>
                                </IconButton>
                            }
                            >
                            <img src={img.largeImageURL} alt=""/>
                        </GridTile>
                    ))}  
                </GridList>
            );
        } else {
            imageContentList = null;
        }

        const actions = [
            <FlatButton 
                label="Close"
                onClick={this.handleClose}
                primary={true}
            />
        ];

        return (
            <div>
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <img src={this.state.currentImg} alt="" style={{width : '100%'}}/>
            </Dialog>
                {imageContentList}
            </div>
        )
    }
}

Results.propTypes = {
    images : PropTypes.array.isRequired
}

export default Results;
