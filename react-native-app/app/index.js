

 

import React, {Component} from 'react';
import { View,Text,AsyncStorage } from 'react-native';

import {Router, Scene, Reducer,Stack,ActionConst,Actions} from 'react-native-router-flux';
import Feather from 'react-native-vector-icons/Feather';
import { Icon } from 'react-native-elements'

import Home from './screens/home/home/home'
import groupScreen from './screens/home/groupScreen/groupScreen'
import detailScreen from './screens/home/detailScreen/detailScreen'
import spinPage from './screens/home/spinPage/spinPage'
import mapPage from './screens/home/mapPage/mapPage'
import profileScreen from './screens/home/profileScreen/profileScreen'
import searchScreen from './screens/home/searchScreen/searchScreen'
import kortingScreen from './screens/home/kortingScreen/kortingScreen'
import startScreen from './screens/home/StartQrcodeScreens/startScreen/startScreen'
import startCheckScreen from './screens/home/StartQrcodeScreens/startCheckScreen/startCheckScreen'
import endScreen from './screens/home/StartQrcodeScreens/endScreen/endScreen'
import questionScreen from './screens/home/StartQrcodeScreens/questionScreen/questionScreen'

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

    componentDidMount() {
        var _this = this;

        //Check if token exist
        AsyncStorage.getItem('token', (err, token) => {
            if (token === null) Actions.welcome();
            else Actions.home();
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                    <Scene key="root">
                        <Stack key="auth" hideNavBar>
                            <Scene key="welcome" hideNavBar hideTabBar panHandlers={null}
                                schema="modal" direction="vertical">
                            <Scene key="welcome-" hideNavBar component={Welcome} title="Welcome" initial={true}
                                    panHandlers={null}/>
                            <Scene key="login" direction="vertical" component={Login} title="Login" panHandlers={null}/>
                            <Scene key="register" direction="vertical" component={Register} title="Register"
                                    panHandlers={null}/>
                            <Scene key="password" direction="vertical" component={Password} title="Password"
                                    panHandlers={null}/>
                            </Scene>
                        </Stack>    
                        <Stack key="main" hideNavBar>
                            <Scene tabs tabBarStyle={{backgroundColor: "white",borderTopColor: "white",shadowOffset:{  width: 2,  height: -3,padding: 10,},shadowColor: '#8386A3',shadowOpacity: 0.12,}}  showLabel={false} hideNavBar>
                                <Scene icon={({ focused }) => (<Feather style={{ width: 30 }} name={focused ? 'home' : 'home'} size={25} color={focused ? '#6FA29B' : '#303E48'}/>)}> 
                                    <Scene key="groupScreen" hideNavBar navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={groupScreen} initial/>
                                    <Scene key="spinPage" hideNavBar navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={spinPage} initial/>
                                    <Scene key="kortingScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}} hideNavBar  component={kortingScreen} initial/>
                                    <Scene key="startScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}} hideNavBar  component={startScreen} initial/>
                                    <Scene key="startCheckScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}} hideNavBar  component={startCheckScreen} initial/>
                                    <Scene key="questionScreen" hideNavBar navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={questionScreen} initial/>
                                    <Scene key="endScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}} hideNavBar   component={endScreen} initial/>
                                    <Scene key="home" hideNavBar navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}} type={ActionConst.REPLACE}  component={Home} initial/>
                                </Scene> 
                                <Scene icon={({ focused }) => (<Feather style={{ width: 30 }} name={focused ? 'search' : 'search'} size={25} color={focused ? '#6FA29B' : '#303E48'}/>)}> 
                                    <Scene key="detailScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}} hideNavBar  component={detailScreen} initial/>
                                    <Scene key="searchScreen" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}} hideNavBar  component={searchScreen} initial/>
                                </Scene> 
                                <Scene icon={({ focused }) => (<Feather style={{ width: 30 }} name={focused ? 'map-pin' : 'map-pin'} size={25} color={focused ? '#6FA29B' : '#303E48'}/>)}> 
                                    <Scene key="mapPage" navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={mapPage} initial/>
                                </Scene>
                                <Scene icon={({ focused }) => (<Feather style={{ width: 30 }} name={focused ? 'user' : 'user'} size={25} color={focused ? '#6FA29B' : '#303E48'}/>)}> 
                                    <Scene key="profileScreen" hideNavBar navigationBarStyle={{ backgroundColor:'#FFF', borderBottomColor: 'transparent'}}  component={profileScreen} initial/>
                                </Scene>
                            </Scene>
                        </Stack>   
                    </Scene>
                </Router>
            </View>
        );
    }
}





/*

<Stack key="auth" hideNavBar>
<Scene key="welcome" hideNavBar hideTabBar panHandlers={null}
    schema="modal" direction="vertical">
<Scene key="welcome-" hideNavBar component={Welcome} title="Welcome" initial={true}
        panHandlers={null}/>
<Scene key="login" direction="vertical" component={Login} title="Login" panHandlers={null}/>
<Scene key="register" direction="vertical" component={Register} title="Register"
        panHandlers={null}/>
<Scene key="password" direction="vertical" component={Password} title="Password"
        panHandlers={null}/>
</Scene>
</Stack>

*/