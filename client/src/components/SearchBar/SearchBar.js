import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //the default value of state
        this.state = {
            hashtag1: '',
            hashtag2: '',
            count: 10,
            result_type: 'popular',
            sortBy: 'favorite'
        }
    }

    //When inputs change, handleChange function will change the state of SearchBar component
    handleChange(type, event) {
        if(type === 'h1'){
            this.setState({hashtag1: event.target.value});
        } else if (type === 'h2') {
            this.setState({hashtag2: event.target.value});
        } else if (type === 'count') {
            this.setState({count: event.target.value});
        } else if (type === 'sort') {
            this.setState({sortBy: event.target.value});
            //call handleSort function in App.js file to sort the current requested tweets
            this.props.onChange(event.target.value)
        } else if (type === 'result_type'){
            this.setState({result_type: event.target.value});
        }
    }

    handleSubmit(event) {
        //call searchTweets function in App.js file for searching tweets
        this.props.onClick(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div style={{margin:10}}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Hashtag1:
                        <input type="text" value={this.state.hashtag1} onChange={(e) => this.handleChange('h1', e)} />
                    </label>
                    <label>
                        Hashtag2:
                        <input type="text" value={this.state.hashtag2} onChange={(e) => this.handleChange('h2', e)} />
                    </label>
                    <label>
                        Number of Tweets:
                        <input type="number" value={this.state.count} onChange={(e) => this.handleChange('count', e)} />
                    </label>
                    <label>
                        Result Type:
                        <select value={this.state.value} onChange={(e) => this.handleChange('result_type', e)}>
                            <option value="popular">Popular</option>
                            <option value="recent">Recent</option>
                            <option value="mixed">Mixed</option>
                        </select>
                    </label>
                    <label>
                        Sort By:
                        <select value={this.state.value} onChange={(e) => this.handleChange('sort', e)}>
                            <option value="favorite">Favorite</option>
                            <option value="retweet">Retweet</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default SearchBar;