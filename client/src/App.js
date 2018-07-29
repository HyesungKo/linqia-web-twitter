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
    //declare the variable "tweets" for current requested tweets to be mutable
    this.tweets = []
  }

  /* When the value of sortBy is changed, sort the current tweets by the given parameter */
  handleSort(sortBy){
    this.sortTweetList(sortBy);
    this.setState({response: this.tweets})
  }

  /* Sort current Tweets by a given parameter in descending order */
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
    //while requesting tweets through nodejs server, send "Please wait!" to the view
    this.setState({response: [{text: "Please wait!", id_str: "1"}]})
    //reset the current tweets to empty array
    this.tweets = []
    //the condition that the value of hashtag1 is not empty
    if(option.hashtag1 !== ''){
      //the condition that the value of hashtag2 if not empty and is not same as the value of hashtag1
      if(option.hashtag2 !== '' && option.hashtag2 !== option.hashtag1) {
        //request tweets with the given option including hashtag1
        fetch(`/api/tweets?hashtag=${option.hashtag1}&count=${option.count}&result_type=${option.result_type}`).then(res => {
          const response = res
          res.json().then(body => {
            //if request has not secceeded, throw error
            if(response.status !== 200) throw Error(body.message);
            for (let i = 0; i < body.statuses.length; i++) {
              //add each tweets to the variable 'tweets'
              this.tweets.push(body.statuses[i])
            }
            //request tweets with the given option including hashtag2
            fetch(`/api/tweets?hashtag=${option.hashtag2}&count=${option.count}&result_type=${option.result_type}`).then(res => {
              const response = res
              res.json().then(body => {
                //if request has not secceeded, throw error
                if(response.status !== 200) throw Error(body.message);
                for (let i = 0; i < body.statuses.length; i++) {
                  //add each tweets to the variable 'tweets'
                  this.tweets.push(body.statuses[i])
                }
                //sort array with the given sort option
                this.sortTweetList(option.sortBy)
                //return only the requested number of tweets
                this.tweets = this.tweets.slice(0, option.count)
                //copy tweets to state
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
      //the condition that the value of hashtag1 is not empty but the value of hashtag2 is empty
      } else {
        //request tweets with the given option including hashtag1
        fetch(`/api/tweets?hashtag=${option.hashtag1}&count=${option.count}&result_type=${option.result_type}`).then(res => {
          const response = res
          res.json().then(body => {
            //if request has not secceeded, throw error
            if(response.status !== 200) throw Error(body.message);
            for (let i = 0; i < body.statuses.length; i++) {
              //add each tweets to the variable 'tweets'
              this.tweets.push(body.statuses[i])
            }
            //sort array with the given sort option
            this.sortTweetList(option.sortBy)
            //copy tweets to state
            this.setState({response: this.tweets})
          }).catch( e => {
            console.log(e);
          })
        }).catch( e => {
          console.log(e);
        })
      } 
    } else {
      //the condition that the value of hashtag1 is empty but the value of hashtag2 is not empty
      if(option.hashtag2 !== '') {
        fetch(`/api/tweets?hashtag=${option.hashtag2}&count=${option.count}&result_type=${option.result_type}`).then(res => {
          const response = res
          res.json().then(body => {
            //if request has not secceeded, throw error
            if(response.status !== 200) throw Error(body.message);
            for (let i = 0; i < body.statuses.length; i++) {
              //add each tweets to the variable 'tweets'
              this.tweets.push(body.statuses[i])
            }
            //sort array with the given sort option
            this.sortTweetList(option.sortBy)
            //copy tweets to state
            this.setState({response: this.tweets})
          }).catch( e => {
            console.log(e);
          })
        }).catch( e => {
          console.log(e);
        }) 
        //the condition that the values of hashtag1 and hashtag2 are empty
      } else {
        //empty the value of response in state
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
        {/* send the searchTweets and handleSort functions to SearchBar coponent */}
        <SearchBar onClick={this.searchTweets} onChange={this.handleSort}/>
        {/* send the value of response in state to TweetBox component */}
        <TweetBox tweets={this.state.response} />
      </div>
    );
  }
}

export default App;
