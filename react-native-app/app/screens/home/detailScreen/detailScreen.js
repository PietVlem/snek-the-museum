
import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList,ScrollView,Linking } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ListItem,Avatar} from 'react-native-elements'
import { NavBar  } from '../../index';

import { fetchExhibitionData,fetchMuseumData } from '../../../actions/home';
import { forceUpdateHandler } from '../mapPage/mapPage';

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

        
        this.props.dispatch(fetchExhibitionData());

    }


    renderMap ({ item, index }) {
        if (index === 0) return (
        <TouchableOpacity onPress={() => Actions.mapPage(item.museumId) /*&& forceUpdateHandler*/}>
        <ListItem
            avatar={<Image style={{ width: 25, height: 25 }} source={item.icon_url} />}
            title={item.info}
            titleStyle={{color:"#6FA29B",marginLeft: 20,fontSize: 13,fontFamily: "MontserratMedium",}}
            titleNumberOfLines={2}
            containerStyle={styles.Liststyle}
            hideChevron
        />
        </TouchableOpacity>)
        else if (item.info !== undefined) return (
          <ListItem
            avatar={<Image style={{ width: 25, height: 25 }} source={item.icon_url} />}
            title={item.info}
            titleStyle={{color:"#6FA29B",marginLeft: 20,fontSize: 13,fontFamily: "MontserratMedium",}}
            titleNumberOfLines={2}
            containerStyle={styles.Liststyle}
            hideChevron
          />  
        )
        else return (
            <ListItem
              avatar={<Image style={{ width: 25, height: 25 }} source={item.icon_url} />}
              title={'geen informatie beschikbaar'}
              titleStyle={{color:"#6FA29B",marginLeft: 20,fontSize: 13,fontFamily: "MontserratMedium",}}
              titleNumberOfLines={2}
              containerStyle={styles.Liststyle}
              hideChevron
            />  
          )
      }
      renderRow ({ item }) {
          return (
          <TouchableOpacity onPress={() => Actions.exhibitionScreen(item,{title: item.name})}>
            <ListItem
              roundAvatar
              title={item.name}
              //avatar={item.photo.url}
              containerStyle={styles.ListstyleBox}
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
        renderGallery ({ item }) {
            return (
                <Image
                source={{uri: item.photo.url}}
                style={{ width: 100, height: 100,marginTop: 20,marginLeft: 10,}}
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
                    museumId: this.props._id,
                },
                
                {
                    info: this.props.openingHours.open  + "\n" +this.props.openingHours.closed,
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
                            onPress={ ()=>{ Linking.openURL(this.props.facebook)}} />
                        <Icon
                            containerStyle={{marginHorizontal: 5,marginTop: 3,}}
                            name='twitter'
                            type='font-awesome'
                            color='#B4B9BE'
                            size={20}
                            onPress={ ()=>{ Linking.openURL(this.props.twitter)}} />
                    </View>
                    </View>
                </View>
                <Image
                    resizeMode={'cover'}
                    style={styles.HeaderImg}
                    source={{uri: this.props.photo.url}}
                />   
                <Text style={styles.DetailText}>
                {this.props.body}
                </Text>
                <FlatList
                    ref='infoRef'
                    data={list}
                    style={styles.Infobox}
                    renderItem={this.renderMap}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.exhibitionTitle}>Tentoonstellingen</Text>
                {this.props.exhibition.filter(item => item.museumId === this.props._id).length != 0 ? (
                <FlatList
                        ref='listExhibition'
                        data={this.props.exhibition.filter(item => item.museumId === this.props._id)}
                        style={styles.Listbox}
                        renderItem={this.renderRow}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}
                        /> 
                ) : (
                    <Text style={{paddingLeft: 30,color: 'lightgrey',marginTop: 20,}}>Geen tentoonstellingen</Text>
                  )}                             
                <View style={styles.galleryBox}>
                    <Text style={styles.galleryTitle}>Foto’s uit het museum</Text>
                {this.props.museum.filter(item => item.id === this.props._id).length != 0 ? (
                    <FlatList
                        horizontal
                        ref='listExhibition'
                        data={this.props.museum.filter(item => item.id === this.props._id)}
                        style={styles.Listbox}
                        renderItem={this.renderGallery}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}
                        /> 
                ) : (
                    <Text style={{paddingLeft: 30,color: 'lightgrey',marginTop: 20,}}>Geen foto's</Text>
                  )}   
                </View>
                <View style={styles.reactionBox}>
                <Text style={styles.reactionTitle}>Reacties</Text>
                    {this.props.museum.reactions != null ? (
                    <FlatList
                    ref='listRef'
                    data={this.props.museum.reactions}
                    style={styles.reactionBoxList}
                    renderItem={this.renderReaction}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}/> 
                ) : (
                    <Text style={{paddingLeft: 30,color: 'lightgrey',marginTop: 20,fontSize:16}}>Geen reacties</Text>
                  )} 
                </View>
            </ScrollView>
            </View>
        );
    }
};


const mapStateToProps = (state,props) => ({
    museum: state.homeReducer.museum,
    exhibition: state.homeReducer.exhibition,
  });

export default connect(mapStateToProps)(detailScreen);
