

 

import React, {Component} from 'react';
import { View } from 'react-native';

import {Router, Scene, Reducer,Stack} from 'react-native-router-flux';

import Home from './screens/home/home/home'
import groupScreen from './screens/home/groupScreen/groupScreen'

import Welcome from './screens/auth/welcome'
import Login from './screens/auth/login'
import Register from './screens/auth/register'
import Password from './screens/auth/password'


//Reducer for Router - See react-native-router-flux package README for more info
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

// Scene Style
/* NavigationSceneRendererProps */
const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null
    };
    return style;
};

export default class Main extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                    <Scene key="root">
                        <Stack key="auth" initial={!this.props.loggedIn}>
                            <Scene key="welcome" hideNavBar hideTabBar panHandlers={null}
                                schema="modal" direction="vertical">
                            <Scene key="welcome-" component={Welcome} title="Welcome" initial={true}
                                    panHandlers={null}/>
                            <Scene key="login" component={Login} title="Login" panHandlers={null}/>
                            <Scene key="register" component={Register} title="Register"
                                    panHandlers={null}/>
                            <Scene key="password" component={Password} title="Password"
                                    panHandlers={null}/>
                            </Scene>
                        </Stack>
                        <Stack key="auth" tabs hideNavBar initial={this.props.loggedIn}>
                            <Scene key="groupScreen"  navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={groupScreen} initial/>
                             <Scene key="home"  navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={Home} initial/>
                        </Stack>
                    </Scene>
                </Router>
            </View>
        );
    }
}