

import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList } = require('react-native');

import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';

import {setStatus, logout} from '../../../actions/auth'; //Import your actions

import { ListItem } from 'react-native-elements';

import { Icon } from 'react-native-elements'

import { SearchBar } from 'react-native-elements';

import styles from './style'

class groupScreen extends Component {
    state = {
        search: '',
      };
    
    updateSearch = search => {
        this.setState({ search });
    };
    componentDidMount() {
        var _this = this;

        // //Check if token exist
        // AsyncStorage.getItem('token', (err, token) => {
        //     if (token === null) Actions.welcome();
        //     else _this.props.setStatus(true)
        // });
    }
    renderRow ({ item }) {
        return (
        <TouchableOpacity onPress={() => Actions.detailScreen()}>
          <ListItem
            roundAvatar
            title={item.name}
            subtitle={item.subtitle}
            avatar={{uri:item.avatar_url}}
            containerStyle={styles.Liststyle}
            subtitleStyle={styles.subtitle}
            titleStyle={styles.ListItemTitle}
            rightIcon={
                <Icon
                name='ios-arrow-forward'
                type='ionicon'
                color='#6FA29B'
                size={15}
                iconStyle={{paddingRight: 15,}}
                onPress={() => console.log('hello')} />
            }
            chevronColor="#6FA29B"
          />
        </TouchableOpacity>   
        )
      }

    render() {
        const { search } = this.state;
        const list = [
            {
              name: 'Design Museum',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Jan Brydelstraat 5, 9000 Gent'
            },
            {
              name: 'Smak',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Jan Hoetplein 1, 9000 Gent'
            },
          ]
        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    containerStyle={styles.ContainerSearchbox}
                    inputStyle={styles.Input}
                    value={search}
                />
                <TouchableOpacity>
                    <Image
                        style={styles.SearchIcon}
                        source={require('../../../../assets/list.png')}
                    /> 
                </TouchableOpacity> 
                <Image
                    style={styles.SnakeLayout}
                    source={require('../../../../assets/logo.png')}
                />   
                <FlatList
                    ref='listRef'
                    data={list}
                    style={styles.Listbox}
                    renderItem={this.renderRow}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}/>
                {
                    
                    // (this.props.loggedIn) &&
                    // <View>
                    //     <Text style={[styles.welcomeText]}>Welcome</Text>
                    //     <Text style={[styles.subText]}>You are logged in.</Text>
                    //     <Button btnText="Logout" onPress={this.props.logout}/>
                    // </View>
                }
            </View>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(groupScreen);
