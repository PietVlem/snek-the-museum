import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList,Animated,Dimensions,StyleSheet,ScrollView } = require('react-native');
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
const { width, height } = Dimensions.get('window');

import { fetchMuseumData } from '../../../actions/home';

const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]
  

  const deviceWidth = Dimensions.get('window').width

class mapPage extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      coordinates: [
        {
          latitude: 51.087064,
          longitude: 3.670115,
        },
        {
          latitude: 51.054588,
          longitude: 3.721880,
        },
      ],
      region: {
        latitude: 51.054588,
        longitude: 3.721880,
        latitudeDelta: 0.0041,
        longitudeDelta: 0.0021
      },
      
    };
    this.mapView = null;
  }

	onReady = (result) => {
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
		Alert.alert(errorMessage);
  }

  componentDidMount() {

    this.props.dispatch(fetchMuseumData());
    
    /*navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log(position);
         this.setState({
            mylatitude: position.coords.latitude,
            mylongitude: position.coords.longitude,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );*/
     {this.props.error ? alert('geen locatie') : null}
     console.log( "this is the museums loader : " + this.props.museum);
     console.log( "De Props : " + this.props);

   }

    static navigationOptions = {
        header: null,
    };  
  
    render() {

      const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
      ]

      return (
        <View
          style={styles.container}
          flex={1}
        >
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
  				style={StyleSheet.absoluteFill}
  				ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
  				onPress={this.onMapPress}
  				loadingEnabled={true}
  			>
        <MapView.Marker identifier="yourLocation" coordinate={this.state.coordinates[0]}>
            <View style={{ width: 10, height: 10 }}>
              <Image source={require('../../../../assets/myLocation.png')} style={{ width: 50, height: 50 }} />
            </View>
        </MapView.Marker>
        <MapView.Marker identifier="destination" coordinate={this.state.coordinates[1]}>
            <View style={{ width: 10, height: 10 }}>
              <Image source={require('../../../../assets/destination.png')} style={{ width: 50, height: 50 }} />
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
            <View style={styles.view}>
            <TouchableOpacity style={styles.Liststyle}>
                <ListItem
                  roundAvatar
                  title={item.name}
                  subtitle={item.subtitle}
                  avatar={{uri:item.avatar_url}}
                  containerStyle={{borderBottomWidth: 0,borderRadius: 10,}}
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
                <View style={styles.MapMuseaBox}>
                  <View style={{flex: 1,flexDirection: 'row',}}>
                      <Image
                          style={styles.distanceIcon}
                          source={require('../../../../assets/mountain.png')}
                      />
                      <Text style={styles.distanceText}>Fiets: 20min </Text>
                  </View>
                  <View style={{flex: 1,flexDirection: 'row',}}>
                      <Image
                          style={styles.distanceIcon}
                          source={require('../../../../assets/bus.png')}
                      />
                      <Text style={styles.distanceText}>Bus: Lijn 55 - 12:30u</Text>
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
