import React, {Component} from 'react';
import Cardlist from '../components/Cardlist';
import Searchbox from '../components/Searchbox';
import '../containers/app.css' ;
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary'

class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => 
            this.setState({robots:users}));
        }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
        
    }

    render(){
        const {robots, searchfield } = this.state;
        const filteredRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        if(!robots.length ){
            return <h1>Loading</h1>
        }else{
        return(
            <div className = 'tc'>
                <h1 className = 'f1'>RoboFriends</h1>
                <Searchbox searchChange = {this.onSearchChange}/> 
                <Scroll>
                    <ErrorBoundary>
                        <Cardlist robots = {filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>  
            </div>
        );
    }
}
}

export default App;