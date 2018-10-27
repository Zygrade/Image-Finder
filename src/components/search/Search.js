import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Results from '../results/Results';

class Search extends Component {

    state = {
        searchText : '',
        amount : 15,
        apiUrl : 'https://pixabay.com/api',
        apiKey : '10516911-cc25817cc16a847dd81517c7d',
        images : [] 
    };

    // Arrow function to eliminate the need to bind 'this' //

    onTextChange = e => {
        let val = e.target.value;
        this.setState({[e.target.name] : val}, () => {
            if(val) {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&safeSearch=true&per_page=${this.state.amount}&image_type=photo`)
                        .then(response => {this.setState({images : response.data.hits})})
                        .catch(error => console.log(error));
            } else {
                this.setState({images:[]});
            }
        });
    };

    onAmountChange = (e,index,value) => this.setState({amount:value});    

    render() {
        console.log(this.state.images);
        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search for Images"
                    fullWidth={true}
                />
                <br/>
                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />

                {this.state.images.length > 0 ?  ( <Results images={this.state.images}/>) : null}

            </div>
        )
    }
}

export default Search;