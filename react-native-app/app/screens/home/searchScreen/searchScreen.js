
 

import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import { NavBar  } from '../../index';
import {Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ListItem,SearchBar } from 'react-native-elements'

class searchScreen extends Component {

    componentDidMount() {
        var _this = this;

        // //Check if token exist
        // AsyncStorage.getItem('token', (err, token) => {
        //     if (token === null) Actions.welcome();
        //     else _this.props.setStatus(true)
        // });
    }

    state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };

    renderRow ({ item }) {
        return (
        item.name === "Amy Farha" ? 
        <TouchableOpacity onPress={() => Actions.detailScreen()}>
          <ListItem
            roundAvatar
            title={item.name}
            subtitle={item.subtitle}
            avatar={{uri:item.avatar_url}}
            containerStyle={styles.ListstyleSelected}
            subtitleStyle={styles.subtitleSelected}
            titleStyle={styles.ListItemTitleSelected}
            rightIcon={
                <Icon
                name='ios-arrow-forward'
                type='ionicon'
                color='white'
                size={15}
                iconStyle={{paddingRight: 15,}}
                onPress={() => console.log('hello')} />
            }
            chevronColor="#6FA29B"
          />
        </TouchableOpacity>  
        :
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
        {item.check === true &&
          <Icon
                name='ios-checkmark'
                type='ionicon'
                color='#6FA29B'
                size={30}
                containerStyle={{position: 'absolute',top: '10%',left: '13%'}}/>
        }
        </TouchableOpacity> 
        )
      }

    render() {
        const { search } = this.state;
        const list = [
            {
              name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Vice President',
              check: false
            },
            {
              name: 'Chris Jackson',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Vice Chairman',
              check: false
            },
          ]
        return (
            <View style={{flex: 1,backgroundColor: "#FFF",marginTop: 10,}}>
                        <View style={{marginLeft: 5,marginTop: 50,}}><NavBar/></View>
                        <View style={styles.SearchIconBox}>
                            <SearchBar
                            inputStyle={{backgroundColor: 'white',fontSize: 14,marginLeft: 20,}}
                            containerStyle={{backgroundColor: 'white',
                            borderBottomColor: 'transparent',
                            width: '90%',textAlign: "left",
                            borderTopColor: 'transparent', borderRadius: 10,
                            shadowColor: "#C7D0F8",
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            shadowOffset: {
                              height: 3,
                              width: 0
                            }}}
                            placeholder="Zoeken..."
                            onChangeText={this.updateSearch}
                            value={search}
                            searchIcon={{ size: 24 }}
                            />
                        </View>   
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
                        keyExtractor={(item, index) => index.toString()}
                        />            
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

export default connect(mapStateToProps, {setStatus, logout})(searchScreen);
