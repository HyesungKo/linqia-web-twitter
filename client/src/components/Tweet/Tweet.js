import React, { Component } from 'react';
import './Tweet.css';

class Tweet extends Component {
    render() {
        return (
            <div>
                {/* show "Please wait!" text while requesting tweets*/}
                {this.props.info.text === "Please wait!" &&
                    <p>
                        {this.props.info.text}
                    </p>
                }
                {/* simple ui for each tweet */}
                {this.props.info.text !== "Please wait!" &&
                    <div className="card">
                        <h3 className="user">
                            <img alt="user_image" src={this.props.info.user.profile_image_url} />
                            <a href={this.props.info.user.url} target="_blank">
                                <span style={{marginLeft: 10}}>{this.props.info.user.screen_name}</span>
                            </a>
                        </h3>
                        <p>
                            {this.props.info.text}
                        </p>
                        <p>
                            {this.props.info.created_at.substring(0, 19)}
                        </p>
                        <h4>
                            <span>
                                Favorite: {this.props.info.favorite_count}
                            </span>
                            <span>
                                Retweet: {this.props.info.retweet_count}
                            </span>
                        </h4>
                    </div>
                }
            </div>
        );
    }
}

export default Tweet;