
 

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



import { fetchMuseumData,fetchProfileData } from '../../../actions/home';

class searchScreen extends Component {

    constructor (props) {
        super(props);
    
        this.state = {
          loading: false,
          error: null,
          value: '',
          username: '',
        };
        this.loadCredentials();
      }

      searchFilterFunction = text => {
        this.setState({
          value: text
        });  
      };
      componentDidMount() {
          this.props.dispatch(fetchMuseumData());
          this.props.dispatch(fetchProfileData());
      }

      async loadCredentials() {
        try {
            const username = await AsyncStorage.getItem('spinnedMuseum');
            this.setState({username: JSON.parse(username)});
        }
        catch (error) {
            // Manage error handling
        }
    }
    

    renderRow ({ item }) {
        return (
        <TouchableOpacity onPress={() => Actions.detailScreen(item)}>
          <ListItem
            roundAvatar
            title={item.title}
            subtitle={item.streetAndNumber + ", " + item.zipcode.code + " " + item.zipcode.city}
            avatar={item.photo.url}
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
        {item.id === true &&
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

      const list = this.state.username
      return (
            <View style={{flex: 1,backgroundColor: "#FFF",marginTop: 10,}}>
                        <View style={{marginLeft: 5,marginTop: 50,}}><NavBar/></View>
                        <View style={styles.SearchIconBox}>
                            <SearchBar
                            inputStyle={{backgroundColor: 'white',fontSize: 14,marginLeft: 20,}}
                            containerStyle={{backgroundColor: 'white',
                            borderBottomColor: 'transparent',
                            width: '90%',
                            borderTopColor: 'transparent', borderRadius: 10,
                            shadowColor: "#C7D0F8",
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            shadowOffset: {
                              height: 3,
                              width: 0
                            }}}
                            placeholder="Zoeken..."
                            ref="search"
                            textInputRef="searchText"
                            value={this.state.value}
                            onChangeText={text => this.searchFilterFunction(text)}
                            searchIcon={{ size: 24 }}
                            />
                        </View> 
                        <View>
                          <TouchableOpacity style={{marginHorizontal: 20,marginBottom: 10,}} onPress={() => Actions.detailScreen(list)}>
                          <ListItem
                            roundAvatar
                            title={list.title}
                            subtitle={'Gepickt museum'}
                            //avatar={list.photo.url}
                            containerStyle={styles.ListstyleSelected}
                            subtitleStyle={styles.subtitleSelected}
                            titleStyle={styles.ListItemTitleSelected}
                            rightIcon={
                                <Icon
                                name='ios-arrow-forward'
                                type='ionicon'
                                color='#FFF'
                                size={15}
                                iconStyle={{paddingRight: 15,}}
                                onPress={() => console.log('hello')} />
                            }
                            chevronColor="#6FA29B"
                          />
                        </TouchableOpacity>
                      </View>  
                        <Image
                            style={styles.SnakeLayout}
                            source={require('../../../../assets/logo.png')}
                        />
                        <FlatList
                        ref='listRef'
                        data={this.props.museum.filter(item => item.title.includes(this.state.value))}
                        style={styles.Listbox}
                        renderItem={this.renderRow}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}
                        /> 
            </View>
        );
    }
};


const mapStateToProps = (state,props) => ({
    museum: state.homeReducer.museum,
  });
  
   export default connect(mapStateToProps)(searchScreen)

