
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

import { fetchExhibitionData} from '../../../actions/home';

//var newArr = Object.keys(Item);
//console.log(newArr);

class exhibitionScreen extends Component {

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

    renderGallery ({ item }) {

        return (
            <Image
            source={{uri: item.eImage[0].url}}
            style={{ width: 100, height: 100,marginTop: 20,marginLeft: 30,}}
          />
        )
      }  

    renderRow ({ item, index }) {
        return (
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

    render() {
        const list = [

            {
                info: "Prijs: " + this.props.price ? this.props.price + " euro" : "onbekend",
                icon_url: require('../../../../assets/money.png'),
            },
            {
                info: "Tentoonstelling van " + this.props.duration + ' minuten',
                icon_url: require('../../../../assets/clock.png'),
            },

          ]
        return (
            <View style={styles.container}>
            <ScrollView>
                <View style={{marginTop: 30,marginLeft: 15,marginBottom: 10,}}><NavBar/></View>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <Text style={styles.DetailTitle}>{this.props.slug}</Text>
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
                    source={{uri: this.props.eImage[0].url}}
                />   
                <TouchableOpacity onPress={() => Actions.kortingScreen(this.props)} style={styles.btnContainer}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        VOORSTELLING ONTDEKKEN
                    </Text>
                </View>
                </TouchableOpacity>
                <Text style={styles.DetailText}>
                {this.props.info}
                </Text>
                <FlatList
                    ref='infoRef'
                    data={list}
                    style={styles.Infobox}
                    renderItem={this.renderRow}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.galleryBox}>
                    <Text style={styles.galleryTitle}>Foto’s van de tentoonstelling</Text>
                    {this.props.exhibition.filter(item => item.id === this.props._id).length != 0 ? (
                        <FlatList
                            horizontal
                            ref='listExhibition'
                            data={this.props.exhibition.filter(item => item.id === this.props._id)}
                            style={styles.Listbox}
                            renderItem={this.renderGallery}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}
                            /> 
                    ) : (
                        <Text style={{paddingLeft: 30,color: 'lightgrey',marginTop: 20,}}>Geen foto's</Text>
                      )}  
                </View>
            </ScrollView>
            </View>
        );
    }
};


const mapStateToProps = (state,props) => ({
    exhibition: state.homeReducer.exhibition,
  });

export default connect(mapStateToProps)(exhibitionScreen);
