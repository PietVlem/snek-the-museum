

 

import React, {Component} from 'react';
import { View,Text } from 'react-native';

import {Router, Scene, Reducer,Stack} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'

import Home from './screens/home/home/home'
import groupScreen from './screens/home/groupScreen/groupScreen'
import detailScreen from './screens/home/detailScreen/detailScreen'

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
                        <Stack key="auth" hideNavBar initial={this.props.loggedIn}>
                            <Scene tabs tabBarStyle={{backgroundColor: "white",borderTopColor: "white",shadowOffset:{  width: 2,  height: -3,padding: 10,},shadowColor: '#8386A3',shadowOpacity: 0.12,}}  showLabel={false} hideNavBar>
                                <Scene icon={({ focused }) => (<Icon style={{ width: 30 }} type='ionicon' name={focused ? 'ios-home' : 'ios-home'} size={25} color={focused ? '#6FA29B' : '#303E48'}/>)}> 
                                    <Scene key="detailScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={detailScreen} initial/>
                                    <Scene key="groupScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={groupScreen} initial/>
                                    <Scene key="home" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={Home} initial/>
                                </Scene> 
                            </Scene>
                        </Stack>
                    </Scene>
                </Router>
            </View>
        );
    }
}