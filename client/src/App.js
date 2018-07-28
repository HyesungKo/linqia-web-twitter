import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import TweetBox from './components/TweetBox/TweetBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.searchTweets = this.searchTweets.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      response: []
    }
    this.tweets = []
  }

  handleSort(sortBy){
    this.sortTweetList(sortBy);
    this.setState({response: this.tweets})
  }

  sortTweetList(sortBy) {
    if(sortBy === 'favorite') {
       this.tweets.sort(function(a, b) {
        if (a.favorite_count < b.favorite_count) {
          return 1;
        }
        if (a.favorite_count > b.favorite_count) {
            return -1;
        }
        return 0;
      })
    } else if(sortBy === 'retweet') {
      this.tweets.sort(function(a, b) {
        if (a.retweet_count < b.retweet_count) {
          return 1;
        }
        if (a.retweet_count > b.retweet_count) {
            return -1;
        }
        return 0;
      })
    }
  }
  
  searchTweets(option) {
    this.setState({response: [{text: "Please wait!", id_str: "1"}]})
    this.tweets = []
    if(option.hashtag1 !== ''){
      if(option.hashtag2 !== '' && option.hashtag2 !== option.hashtag1) {
        fetch(`/api/tweets?hashtag=${option.hashtag1}&count=${option.count}&result_type=${option.result_type}`).then(res => {
          const response = res
          res.json().then(body => {
            if(response.status !== 200) throw Error(body.message);
            for (let i = 0; i < body.statuses.length; i++) {
              this.tweets.push(body.statuses[i])
            }
            fetch(`/api/tweets?hashtag=${option.hashtag2}&count=${option.count}&result_type=${option.result_type}`).then(res => {
              const response = res
              res.json().then(body => {
                if(response.status !== 200) throw Error(body.message);
                for (let i = 0; i < body.statuses.length; i++) {
                  this.tweets.push(body.statuses[i])
                }
                
                this.sortTweetList(option.sortBy)
                this.tweets = this.tweets.slice(0, option.count)
                console.log(this.tweets);
                this.setState({response: this.tweets})
              }).catch( e => {
                console.log(e);
              })
            }).catch( e => {
              console.log(e);
            }) 
          }).catch( e => {
            console.log(e);
          })
        }).catch( e => {
          console.log(e);
        })
      } else {
        fetch(`/api/tweets?hashtag=${option.hashtag1}&count=${option.count}&result_type=${option.result_type}`).then(res => {
          const response = res
          res.json().then(body => {
        
            if(response.status !== 200) throw Error(body.message);
            for (let i = 0; i < body.statuses.length; i++) {
              this.tweets.push(body.statuses[i])
            }
            console.log(this.tweets);
            this.sortTweetList(option.sortBy)
            this.setState({response: this.tweets})
          }).catch( e => {
            console.log(e);
          })
        }).catch( e => {
          console.log(e);
        })
      } 
    } else {
      if(option.hashtag2 !== '') {
        fetch(`/api/tweets?hashtag=${option.hashtag2}&count=${option.count}&result_type=${option.result_type}`).then(res => {
          const response = res
          res.json().then(body => {
        
            if(response.status !== 200) throw Error(body.message);
            for (let i = 0; i < body.statuses.length; i++) {
              this.tweets.push(body.statuses[i])
            }
            console.log(this.tweets);
            this.sortTweetList(option.sortBy)
            this.setState({response: this.tweets})
          }).catch( e => {
            console.log(e);
          })
        }).catch( e => {
          console.log(e);
        }) 
      } else {
        this.setState({response: this.tweets})
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Twitter Content Lab</h1>
        </header>
        <SearchBar onClick={this.searchTweets} onChange={this.handleSort}/>
        <TweetBox tweets={this.state.response} />
      </div>
    );
  }
}

export default App;
