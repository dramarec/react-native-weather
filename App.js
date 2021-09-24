/* eslint-disable prettier/prettier */
// import React, { useState, useEffect } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     ActivityIndicator,
//     PermissionsAndroid,
//     hasLocationPermission,
// } from 'react-native';
// import Weather from './components/Weather';
// import SearchBar from './components/SearchBar';
// // import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';

// const API_KEY = 'bd3f71bcacc6ce6ab087bf08732a5711';

// export default function App() {
//     const [weatherData, setWeatherData] = useState(null);
//     const [loaded, setLoaded] = useState(true);
//     const [positions, setPositions] = useState({ lat: null, lon: null });


//     // const fetchWeatherData = async (cityName) => {
//     const fetchWeatherData = async () => {
//         setLoaded(false);
//         // if (position != null) {
//         const API = `https://api.openweathermap.org/data/2.5/weather?lat=${positions.lat}&lon=${positions.lon}&appid=${API_KEY}`;
//         // }
//         // const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
//         console.log('🔥🚀 ===> fetchWeatherData ===> API', API);

//         try {
//             const response = await fetch(API);
//             if (response.status === 200) {
//                 const data = await response.json();
//                 setWeatherData(data);
//             } else {
//                 setWeatherData(null);
//             }
//             setLoaded(true);
//         } catch (error) {
//             console.log('🔥🚀 ===> fetchWeather ===> error', error);
//         }
//     };
//     // useEffect(() => {
//     //     // fetchWeatherData('Kiev');
//     //     fetchWeatherData('Kiev');
//     // }, []);
//     useEffect(() => {
//         // fetchWeatherData('Kiev');
//         fetchWeatherData(positions);
//     }, [positions]);

//     const getLocation = async () => {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Yoy hew PermissionsAndroid');
//             Geolocation.getCurrentPosition(
//                 position => {
//                     console.log('position=>', position);
//                     setPositions({
//                         lat: position.coords.latitude,
//                         lon: position.coords.longitude,
//                     });
//                 },
//                 error => {
//                     // See error code charts below.
//                     console.log(error.code, error.message);
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//             );
//         }
//     };


//     useEffect(() => {
//         Geolocation.getCurrentPosition(position => {
//             console.log('🚀 position =>', position);
//             setPositions({
//                 lat: position.coords.latitude,
//                 lon: position.coords.longitude,
//             });
//         },
//             error => {
//                 // See error code charts below.
//                 console.log(error.code, error.message);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//         );
//     }, []);

//     if (!loaded) {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator color="blue" size={56} />
//             </View>
//         );
//     } else if (weatherData === null) {
//         return (
//             <View style={styles.container}>
//                 <SearchBar fetchWeatherData={fetchWeatherData} />
//                 <Text style={styles.primaryText}>
//                     City Not Found! Try Different City
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Weather
//                 weatherData={weatherData}
//                 fetchWeatherData={fetchWeatherData}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     primaryText: {
//         margin: 20,
//         fontSize: 28,
//     },
// });

//======================================================
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    PermissionsAndroid,
    // hasLocationPermission,
    Platform,
} from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';


import { API_KEY, API_GEO } from '@env';

Geocoder.init(API_GEO);

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const [positions, setPositions] = useState({ lat: null, lon: null });
    // console.log('🔥🚀 ===> App ===> positions', positions);

    // const { lat, lon } = positions;
    // console.log('🔥🚀 ===> App ===> lat', lat);
    // console.log('🔥🚀 ===> App ===> lon', lon);

    // Geocoder.from(50.451306, 30.520944)
    // Geocoder.from(41.89, 12.49)
    // Geocoder.from(positions.lat, positions.lon)
    //     .then(json => {
    //         console.log('🔥🚀 ===> App ===> positions.lon', positions.lon);
    //         console.log('🔥🚀 ===> App ===> json', json);
    //         const addressComponent = json.results[0].address_components;
    //         console.log('🔥🚀 ===> App ===> addressComponent', addressComponent[3].long_name);
    //     })
    //     .catch(error => console.warn(error));

    // ! to geocoder
    // const getAddress = async (lat, lon) => {
    //     Geocoder.fallbackToGoogle('AIzaSyCTmt0kX3OfmKyuVkKSclfnE5skfTVD4gM');
    //     let response = await Geocoder.geocoderPosition({ lat, lon });
    // };


    // async function fetchWeatherData(positions) {
    const fetchWeatherData = async (cityName) => {
        setLoaded(false);
        // const API = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}`;
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;


        try {
            const response = await fetch(API);
            if (response.status === 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
            console.log('🔥🚀 ===> fetchWeather ===> error', error);
        }
    };

    const location = useCallback(() => {
        const getLocation = async () => {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (Platform.OS === 'ios' || granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('!!!Yoy hew PermissionsAndroid!!!');

                Geolocation.getCurrentPosition(position => {
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                        .then(json => {
                            console.log('🔥🚀 ===> App ===> json', json);
                            const addressComponent = json.results[0].address_components;
                            // console.log('🔥🚀 ===> App ===> addressComponent', addressComponent[3].long_name);
                            setPositions(addressComponent[3].long_name);
                        })
                        .catch(error => console.warn(error));
                    // console.log('position=>', position);
                    // setPositions({
                    //     lat: position.coords.latitude,
                    //     lon: position.coords.longitude,
                    // });
                },
                    error => {
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        };
        getLocation();
    }, []);


    useEffect(() => {
        // Platform.OS === 'ios' ?
        //     Geolocation.getCurrentPosition(
        //         position => {
        //             console.log('🚀 position =>', position);
        //             setPositions({
        //                 lat: position.coords.latitude,
        //                 lon: position.coords.longitude,
        //             });
        //         },
        //         error => {
        //             // See error code charts below.
        //             console.log(error.code, error.message);
        //         },
        //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        //     ) :
        location();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     fetchWeatherData(positions);
    // }, [positions]);
    useEffect(() => {
        fetchWeatherData();
    }, []);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color="blue" size={56} />
            </View>
        );
    } else if (weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <Text style={styles.primaryText}>
                    City Not Found! Try Different City
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Weather
                weatherData={weatherData}
                fetchWeatherData={fetchWeatherData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        margin: 20,
        fontSize: 28,
    },
});
// //======================================================
// import React, { useState, useEffect } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     ActivityIndicator,
//     PermissionsAndroid,
//     hasLocationPermission,
//     Platform,
// } from 'react-native';
// import Weather from './components/Weather';
// import SearchBar from './components/SearchBar';
// // import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';

// const API_KEY = '46a9246bebba16d42b36aac3fc3ba8af';

// export default function App() {
//     const [weatherData, setWeatherData] = useState(null);
//     const [loaded, setLoaded] = useState(true);
//     const [positions, setPositions] = useState({ lat: null, lon: null });
//     console.log('🔥🚀 ===> App ===> positions', positions);

//     async function fetchWeatherData(cityName) {
//         setLoaded(false);
//         const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
//         try {
//             const response = await fetch(API);
//             if (response.status === 200) {
//                 const data = await response.json();
//                 setWeatherData(data);
//             } else {
//                 setWeatherData(null);
//             }
//             setLoaded(true);
//         } catch (error) {
//             console.log('🔥🚀 ===> fetchWeather ===> error', error);
//         }
//     }

//     const getLocation = async () => {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Yoy hew PermissionsAndroid');
//             Geolocation.getCurrentPosition(
//                 position => {
//                     console.log('position=>', position);
//                     setPositions({
//                         lat: position.coords.latitude,
//                         lon: position.coords.longitude,
//                     });
//                 },
//                 error => {
//                     // See error code charts below.
//                     console.log(error.code, error.message);
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//             );
//         }
//     };

//     useEffect(() => {

//         Platform.IOS ?
//             Geolocation.getCurrentPosition(
//                 position => {
//                     console.log('🚀 position =>', position);
//                     setPositions({
//                         lat: position.coords.latitude,
//                         lon: position.coords.longitude,
//                     });
//                 },
//                 error => {
//                     // See error code charts below.
//                     console.log(error.code, error.message);
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//             ) :
//             getLocation();
//         fetchWeatherData();

//     }, []);

//     if (!loaded) {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator color="blue" size={56} />
//             </View>
//         );
//     } else if (weatherData === null) {
//         return (
//             <View style={styles.container}>
//                 <SearchBar fetchWeatherData={fetchWeatherData} />
//                 <Text style={styles.primaryText}>
//                     City Not Found! Try Different City
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Weather
//                 weatherData={weatherData}
//                 fetchWeatherData={fetchWeatherData}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     primaryText: {
//         margin: 20,
//         fontSize: 28,
//     },
// });


