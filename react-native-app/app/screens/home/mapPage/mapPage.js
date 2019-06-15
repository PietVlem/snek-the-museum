import React, {Component} from 'react';
var { View, Alert,Text, AsyncStorage,Image,TouchableOpacity,FlatList,Animated,Dimensions,StyleSheet,ScrollView, Platform } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import { NavBar  } from '../../index';
import {Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ListItem } from 'react-native-elements'
import { Constants, MapView } from 'expo';

import MapViewDirections from './MapViewDirections';
import fetchBicycleDuration from './MapViewDirections';
const { width, height } = Dimensions.get('window');

import { fetchMuseumData } from '../../../actions/home';

const ASPECT_RATIO = width / height;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBQ6Z16L3HplA0FqT03Q24dgizIhLUEKvI';
// old key const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';


const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]
  

  const deviceWidth = Dimensions.get('window').width

class mapPage extends Component {  

  constructor(props) {
    super(props);
    //zoek het juiste museum
    const result = this.props.museum.find(museum => (museum._id === this.props.data));
    const latitude = Number(result.latitude);
    const longitude = Number(result.longitude);

    //console.log("dit het resultaat : " + JSON.stringify(result));
    //console.log("dit de latitude : " + latitude);
    //console.log("dit de longitude : " + longitude);

    this.state = {
      loading: false,
      error: null,
      value: '',
      coordinates: [
        {
          latitude: 51.087064,
          longitude: 3.670115,
        },
        {
          latitude: latitude,
          longitude: longitude,
        },
      ],
      region: {
        latitude: 51.087064,
        longitude: 3.670115,
        latitudeDelta: 0.0041,
        longitudeDelta: 0.0021
      },
      
    };

    this.mapView = null;
    //check coordinaten
    console.log("dit zijn de coords : " + this.state.coordinates[0])
  }

  getLocation(id) {

    const result = this.props.museum.find(museum => (museum._id === id));
    //console.log("dit de data : " + JSON.stringify(this.props.museum));


    console.log("dit het resultaat : " + result);
    console.log("dit het resultaat : " + result.langtitude);
	
	}

	onReady = (result) => {
    //Alert.alert(errorMessage);
    console.log("dit is de onReady functie : " + result.duration);
		this.mapView.fitToCoordinates(result.coordinates, {
			edgePadding: {
				right: (width / 20),
				bottom: (height / 20),
				left: (width / 20),
				top: (height / 20),
			}
		});
	}

	onError = (errorMessage) => {
    //Alert.alert(errorMessage);
    console.log("dit is de error functie : " + errorMessage);
  }

  componentDidMount() {

    this.props.dispatch(fetchMuseumData());

    
    
    //getLocation(this.props.data)

    
    /*navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
            mylatitude: position.coords.latitude,
            mylongitude: position.coords.longitude,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );*/

   }

   forceUpdateHandler(){
    
    console.log("Force Update!!!!!!");
    this.forceUpdate();
    
  }

   componentDidUpdate() {

    /*this.setState( (state) => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.coordinates[1].latitude = latitude;
      newState.coordinates[1].longitude = longitude;
      return ({
        coordinates: newState.coordinates});
      });*/
    

   }

    static navigationOptions = {
        header: null,
    };  
    
    render() {

      return (
        <View
          style={styles.container}
          flex={1}
        >
        <MapView
          ref={map => this.map = map}
          key={this.state.forceRefresh}
          initialRegion={this.state.region}
  				style={StyleSheet.absoluteFill}
  				ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
  				onPress={this.onMapPress}
  				loadingEnabled={true}
  			>
            <MapView.Marker identifier="yourLocation" coordinate={this.state.coordinates[0]}>
                <View style={{ width: 10, height: 10 }}>
                  <Image source={require('../../../../assets/myLocation.png')} style={{ width: 50, height: 50,bottom: 40, }} />
                </View>
            </MapView.Marker>
            <MapView.Marker identifier="destination" coordinate={this.state.coordinates[1]}>
                <View style={{ width: 10, height: 10 }}>
                  <Image source={require('../../../../assets/destination.png')} style={{ width: 50, height: 50 , bottom: 40,}} />
                </View>
            </MapView.Marker>

            {(this.state.coordinates.length === 2) && (
              <MapViewDirections
                origin={this.state.coordinates[0]}
                destination={this.state.coordinates[1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#6FA29B"
                onReady={this.onReady}
                onError={this.onError}
              />
            )}
  			</MapView>
        <ScrollView 
          ref={(scrollView) => { this.scrollView = scrollView; }}
          contentOffset={{
            x: 0,
            y: 0
          }}
          style={{position:"absolute",bottom: 30}}
          horizontal={true}
          pagingEnabled={true}
          bounces={!!this.props.bounces}
          scrollsToTop={false}
          onScroll={this.handleHorizontalScroll}
          scrollEventThrottle={100}
          removeClippedSubviews={false}
          automaticallyAdjustContentInsets={false}
          directionalLockEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onLayout={this.adjustCardSize}
        >
        {
          this.props.museum.map((item, i) => (
            
            //variable om mee te geven met fetchBicycleDuration
            destination = [
                {
                  latitude : item.latitude,
                  longitude: item.longitude,
                }
            ],
            //console.log("origin " + this.state.coordinates[0] + "destination " + destination),

            <View key={"View_Container"+i} style={styles.view}>
            <TouchableOpacity key={"Touchable"+i} style={styles.Liststyle} 
            onPress={() => 
            //update latitude
            this.setState( (state) => {
              let newState = JSON.parse(JSON.stringify(state));
              newState.coordinates[1].latitude = item.latitude;
              return ({
                coordinates: newState.coordinates});
              })&&
            //update latitude
            this.setState( (state) => {
              let newState = JSON.parse(JSON.stringify(state));
              newState.coordinates[1].longitude = item.longitude;
              return ({
                coordinates: newState.coordinates});
              })
              }>
                <ListItem
                  key={"List"+i}
                  roundAvatar
                  title={item.title}
                  subtitle={item.zipcode.city + ", " + item.zipcode.code + " " + item.zipcode.country}
                  avatar={item.photo.url}
                  containerStyle={{borderBottomWidth: 0,borderRadius: 10,}}
                  subtitleStyle={styles.subtitle}
                  titleStyle={styles.ListItemTitle}
                  rightIcon={
                      <Icon
                      key={"Icon"+i}
                      name='ios-arrow-forward'
                      type='ionicon'
                      color='#6FA29B'
                      size={15}
                      iconStyle={{paddingRight: 15,}} />
                  }
                  chevronColor="#6FA29B"
                />
                <View key={"MuseaBox"+i} style={styles.MapMuseaBox}>
                  <View key={"FlexViewA"+i} style={{flex: 1,flexDirection: 'row',}}>
                      <Image
                          key={"BikeIcon"+i}
                          style={styles.distanceIcon}
                          source={require('../../../../assets/mountain.png')}
                      />
                      <Text key={"BikeText"+i} style={styles.distanceText}>Fiets: {fetchBicycleDuration(this.state.coordinates[0], destination, GOOGLE_MAPS_APIKEY)} </Text>
                  </View>
                  <View key={"FlexViewB"+i} style={{flex: 1,flexDirection: 'row',}}>
                      <Image
                          key={"BusIcon"+i}
                          style={styles.distanceIcon}
                          source={require('../../../../assets/bus.png')}
                      />
                      <Text key={"BusText"+i} style={styles.distanceText}>Bus: Lijn 55 - 12:30u</Text>
                  </View>
                </View>  
            </TouchableOpacity>
            </View> 
          ))
        }          
        </ScrollView>
        </View>
      )
    }

  
  
        // return (
        //     <View style={{flex: 1,backgroundColor: "#FFF"}}>
        //     <View style={stylesInline.container}>
        //     <MapView
        //       ref={map => this.map = map}
        //       initialRegion={this.state.region}
        //       style={stylesInline.container}
        //     >
        //     {this.state.markers.map((marker, index) => {
        //         const scaleStyle = {
        //           transform: [
        //             {
        //               scale: interpolations[index].scale,
        //             },
        //           ],
        //         };
        //         const opacityStyle = {
        //           opacity: interpolations[index].opacity,
        //         };
        //         return (
        //           <MapView.Marker key={index} coordinate={marker.coordinate}>
        //             <Animated.View style={[stylesInline.markerWrap, opacityStyle]}>
        //               <Animated.View style={[stylesInline.ring, scaleStyle]} />
        //               <View style={stylesInline.marker} />
        //             </Animated.View>
        //           </MapView.Marker>
        //         );
        //       })}
        //     </MapView>
        //     <Animated.ScrollView

        //     horizontal
        //     showsHorizontalScrollIndicator={false}
        //     scrollEventThrottle={10}
        //     pagingEnabled 
        //       onScroll={Animated.event(
        //         [
        //           {
        //             nativeEvent: {
        //               contentOffset: {
        //                 x: this.animation,
        //               },
        //             },
        //           },
        //         ],
        //         { useNativeDriver: true }
        //       )}
        //       style={stylesInline.scrollView}
        //       contentContainerStyle={stylesInline.endPadding}
        //     >
        //       {this.state.markers.map((marker, index) => (
        //         <View style={stylesInline.card} key={index}>
        //             <FlatList
        //             ref='listRef'
        //             data={list}
        //             style={styles.Listbox}
        //             renderItem={this.renderRow}
        //             initialNumToRender={5}
        //             keyExtractor={(item, index) => index.toString()}/>            
        //         </View>
        //       ))}
        //     </Animated.ScrollView>
        //   </View>
        // </View>
        // );
};



function mapStateToProps(state, props) {
    return {
        //loggedIn: state.authReducer.loggedIn
        museum: state.homeReducer.museum,
        
    }

}

export default connect(mapStateToProps)(mapPage);
