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

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]
  

  const deviceWidth = Dimensions.get('window').width

class mapPage extends Component {
  

    

    state = {
        markers: [
          {
            coordinate: {
              latitude: 45.524548,
              longitude: -122.6749817,
            },
            title: "Best Place",
            description: "This is the best place in Portland",
          },
          {
            coordinate: {
              latitude: 45.524698,
              longitude: -122.6655507,
            },
            title: "Second Best Place",
            description: "This is the second best place in Portland",
          },
          {
            coordinate: {
              latitude: 45.5230786,
              longitude: -122.6701034,
            },
            title: "Third Best Place",
            description: "This is the third best place in Portland",
          },
          {
            coordinate: {
              latitude: 45.521016,
              longitude: -122.6561917,
            },
            title: "Fourth Best Place",
            description: "This is the fourth best place in Portland",
          },
        ],
        region: {
          latitude: 45.52220671242907,
          longitude: -122.6653281029795,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        },
      };
      

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
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(mapPage);
