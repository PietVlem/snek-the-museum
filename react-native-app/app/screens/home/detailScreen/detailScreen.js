
import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList,ScrollView } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ListItem,Avatar } from 'react-native-elements'
import { NavBar  } from '../../index';

import { fetchMuseumData } from '../../../actions/home';

//var newArr = Object.keys(Item);
//console.log(newArr);

class detailScreen extends Component {

    constructor (props) {
        super(props);
    
        this.state = {
          loading: false,
          error: null,
          value: ''
        };
    }

    componentDidMount() {
        //var Img = this.props.photo.url;
        //alert(this.props.title);
        console.log(this.props);
    }

    renderRow ({ item, index }) {
        if (index === 0) return (
        <TouchableOpacity onPress={() => Actions.mapPage(item)}>
        <ListItem
            avatar={<Image style={{ width: 25, height: 25 }} source={item.icon_url} />}
            title={item.info}
            titleStyle={{color:"#6FA29B",marginLeft: 20,fontSize: 13,fontFamily: "MontserratMedium",}}
            titleNumberOfLines={2}
            containerStyle={styles.Liststyle}
            hideChevron
        />
        </TouchableOpacity>)
        else return (
          <ListItem
            avatar={<Image style={{ width: 25, height: 25 }} source={item.icon_url} />}
            title={item.info}
            titleStyle={{color:"#6FA29B",marginLeft: 20,fontSize: 13,fontFamily: "MontserratMedium",}}
            titleNumberOfLines={2}
            containerStyle={styles.Liststyle}
            hideChevron
          />  
        )
      }

    renderReaction ({ item }) {
        return (
          <View style={styles.reactionstyle}> 
            <ListItem
                roundAvatar
                subtitle={item.title}
                avatar={{uri:item.avatar_url}}
                title={item.name}
                containerStyle={{borderBottomWidth: 0,backgroundColor: "white",paddingLeft: 10,}}
                titleStyle={styles.reactionName}
                subtitleStyle={styles.reactionSubTitle}
                rightIcon={
                    <Text style={{marginTop: -15,marginRight: 10,fontSize:12,color:"#303E48",}}>{item.published}</Text>
                }
            /> 
            <Text style={styles.reactionBody}>Dit museum was super!</Text>
          </View>  
        )
    }  

    render() {
        const list = [
            {
              info: 'Bekijk de route',
              icon_url: require('../../../../assets/route.png'),
            },
            {
                info: '€5 voor volwassenen \n€2.5 per kind',
                icon_url: require('../../../../assets/money.png'),
            },
            {
                info: this.props.exhibition.duration,
                icon_url: require('../../../../assets/clock.png'),
            },
            {
                info: this.props.openingHours.open + this.props.openingHours.closed,
                icon_url: require('../../../../assets/calendar.png'),
            },
          ]

          const listReaction = [
            {
              name: 'Jelena',
              title: 'Super Museum',
              body: 'Dit museum was super!',
              published: "5u geleden",
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            },
          ]
        return (
            <View style={styles.container}>
            <ScrollView>
                <View style={{marginTop: 30,marginLeft: 15,marginBottom: 10,}}><NavBar/></View>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <Text style={styles.DetailTitle}>{this.props.title}</Text>
                    <View style={{flex:1,alignItems: 'flex-end',marginRight: 30,}}>
                    <View style={{flexDirection:'row'}}>

                        <Icon
                            name='facebook-f'
                            containerStyle={{marginHorizontal: 5,marginTop: 3,}}
                            type='font-awesome'
                            color='#B4B9BE'
                            size={20}
                            onPress={() => console.log('hello')} />
                        <Icon
                            containerStyle={{marginHorizontal: 5,marginTop: 3,}}
                            name='twitter'
                            type='font-awesome'
                            color='#B4B9BE'
                            size={20}
                            onPress={() => console.log('hello')} />
                    </View>
                    </View>
                </View>
                <Image
                    resizeMode={'cover'}
                    style={styles.HeaderImg}
                    source={{uri: this.props.photo.url}}
                />   
                <TouchableOpacity onPress={() => Actions.kortingScreen()} style={styles.btnContainer}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        MUSEUM ONTDEKKEN
                    </Text>
                </View>
                </TouchableOpacity>
                <Text style={styles.DetailText}>
                {this.props.body}
                </Text>
                
                
                
                
                <Text style={styles.Infobox}>Bekijk de route</Text>
                <FlatList
                    ref='infoRef'
                    data={list}
                    style={styles.Infobox}
                    renderItem={this.renderRow}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.galleryBox}>
                    <Text style={styles.galleryTitle}>Foto’s uit het museum</Text>
                </View>
                <View style={styles.reactionBox}>
                    <Text style={styles.reactionTitle}>Reacties (1)</Text>
                    <FlatList
                    ref='listRef'
                    data={listReaction}
                    style={styles.reactionBoxList}
                    renderItem={this.renderReaction}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}/> 

                    <TouchableOpacity onPress={() => Actions.spinPage()} style={styles.btnContainer}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                REACTIE PLAATSEN
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
        );
    }
};


const mapStateToProps = (state,props) => ({
    data: state.homeReducer,
  });

export default connect(mapStateToProps)(detailScreen);
