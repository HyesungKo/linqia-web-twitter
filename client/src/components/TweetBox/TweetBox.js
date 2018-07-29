import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tweet from '../Tweet/Tweet'

class TweetBox extends Component {

    render() {
        return (
            <div>
                {this.props.tweets.length === 0 &&
                    <h3>Please type one or two hashtags for searching tweets</h3>
                }
                {/* mapping the tweets and send each tweets to Tweet.js file */}
                {
                    this.props.tweets 
                        .map(tweet =>   
                        <Tweet key={tweet.id_str} info={tweet}></Tweet>    
                )}
            </div>
        );
    }
}

TweetBox.propTypes = {
    tweets: PropTypes.array.isRequired
};

export default TweetBox;