
import React from 'react';
import axios from "axios";
import GoogleMapReact from 'google-map-react';

import '../css/users.css';
import '../App.css';

import Icons from './Icons';


const GMAPS_API_KEY = 'AIzaSyADkhbnJGwJi7ykabSqHuwM9ibeSwI0NkE';
const BASE_URL_ALL_USERS = 'http://localhost:3000/users.json'

// Marker Icon on the map
function MyMarker(text){
    return (
    <div className='mapMarker' onClick={text.myClickProps}><abbr title="Click for details">{Icons.location} {text.name}</abbr>
    </div>
    );
}

// Return map bounds based on list of places
const getMapBounds = (map, maps, locations) => {
    const bounds = new maps.LatLngBounds();

    locations.forEach((location) => {
        console.log('getMapBounds location', location)
        bounds.extend(
            new maps.LatLng(
                location.latitude, 
                location.longitude

        ));
    }); //.forEach
    return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        })
    })
}


// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, locations) => {

    if (map){
        console.log('check', map)
        // Get bounds by our places
        const bounds = getMapBounds(map, maps, locations);
        // Fit map to bounds
        map.fitBounds(bounds);
        // Bind the resize listener
        bindResizeListener(map, maps, bounds);
    }
};







class UserLocation extends React.Component {

    state = {
        users: null,
        clickUser: null,
        loading: true,
        error: null
    }

    componentDidMount(){
        this.fetchUsers();

    }

    fetchUsers = async() => {
        try{
            const res = await axios.get(BASE_URL_ALL_USERS);
            console.log('fetchUsers', res.data);
            this.setState({loading: false, users: res.data});

        } catch(err){
            console.error('Error loading users', err);
            this.setState({loading: false, error: err});

        }
    } // fetchUsers


    // click the user location logo and give its infomation
    handleMarkerClick = (clickUserInfo) => {
        console.log(clickUserInfo);
        console.log(clickUserInfo.location.split(' ').slice(-3).join(', '));
        this.setState({clickUser: clickUserInfo});
    }

    // //anywhere on the map will give lat and lng
    // handleMapClick = (ev) => {
    //     console.log('handleMapClick', ev);
    // }







    render(){
       
        return (
            <div>
                {this.state.users &&
                <div  className='user_location'>
                    <GoogleMapReact
                        // onClick={this.handleMapClick}
                        bootstrapURLKeys = {{key: GMAPS_API_KEY}}
                        defaultCenter = {{lat: -33.7536, lng: 151.2886}}
                        defaultZoom = {10}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({map, maps}) => apiIsLoaded(map, maps, this.state.users)}
                    >

                        {/* <MyMarker lat={-33.7536} lng={151.2886} /> */}

                        {
                            this.state.users.map(item => 
                            <MyMarker 
                            key={item.id} 
                            name = {item.screen_name}
                            lat={item.latitude} lng={item.longitude}
                            myClickProps = {() => this.handleMarkerClick(item)}
                            />)
                        }

                    </GoogleMapReact>
                </div>
                }

                {this.state.clickUser &&
                    <div className='click_user_info'>

                        <strong>User Information</strong>
                        <p>Name: {this.state.clickUser.screen_name}</p>
                        <p>Email: {this.state.clickUser.email}</p>
                        <p>Location: {this.state.clickUser.location.split(' ').slice(-3).join(', ')}</p>
                                                   
                    </div>
                }
            </div>
        );
    } // render()

} // class UserLocation

export default UserLocation