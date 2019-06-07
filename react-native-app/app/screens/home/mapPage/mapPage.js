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
import MapView from "react-native-maps";
import { TabNavigator } from "react-navigation";
import Polyline from '@mapbox/polyline';

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
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude:-6.23,
      cordLongitude:106.75,
      markers: [
        {
          coordinate: {
            latitude: 51.087064,
            longitude: 3.670115,
          },
          title: "your location",
        },
        {
          coordinate: {
            latitude: 51.054588,
            longitude: 3.721880,
          },
          title: "Destination",
          description: "museum",
        },
      ],
      region: {
        latitude: 51.054588,
        longitude: 3.721880,
      },
      
    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

   mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, "51.054588,3.721880");
       });
     }

   }

   async getDirections(startLoc, destinationLoc) {

    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords})
        return coords
    } catch(error) {
        alert(error)
        return error
    }
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
               style={{flex: 1}}
             >
      {this.state.markers.map((marker:any)  => (  
              <MapView.Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
              />
         ))}

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }
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
          list.map((item, i) => (
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
    }
}

export default connect(mapStateToProps, {setStatus, logout})(mapPage);
