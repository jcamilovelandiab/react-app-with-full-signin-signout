import React, {Component} from 'react';
import MyMenu from '../MyMenu/MyMenu';
//import {CameraFeed} from '../MyCamera/CameraFeed'
//import Container from '@material-ui/core/Container';
import MyCamera from '../MyCamera/MyCamera';

export default class PrivateHome extends Component{
    render(){
        return(
            <React.Fragment>
                <MyMenu />
                {/*<CameraFeed />*/}
                <MyCamera/>
            </React.Fragment>
        );
    }

}