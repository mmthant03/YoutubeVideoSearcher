import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import SearchBar from './components/search_bar';

const API_KEY = '<your api key here>';


// Create a component and this component 
// produces some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos : [],
            selectedVideo: null    
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term){
        YTSearch({ key : API_KEY, term : term }, (videos) => {
            this.setState({ 
                videos : videos,
                selectedVideo : videos[0] 
            }); // this.setState({ videos }); only works with same variable name
        }); 
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video = {this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
                    videos = {this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated HTML and put it 
// on the page (in the dom)
ReactDOM.render(<App />, document.querySelector('.container'));
