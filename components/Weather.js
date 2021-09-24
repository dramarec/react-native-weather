/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    // StatusBar,
    // TouchableOpacity,
} from 'react-native';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';
import SearchBar from './SearchBar';

const Weather = ({ weatherData, fetchWeatherData }) => {
    const [backgroundImage, setBackgroundImage] = useState(null);

    // let { weather } = weatherData;

    // const [{ main }] = weather;

    const {
        weather,
        name,
        main: { humidity },
        wind: { speed },
    } = weatherData;

    const [{ main }] = weather;

    // const weather = weatherData?.weather[0]
    const temp = weatherData.main.temp - 272.15;

    const roundTemp = temp => {
        let a = temp * 100 + 0.5;
        let finalTamp = Math.trunc(a / 100);
        return finalTamp;
    };

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData]);

    const getBackgroundImg = weather => {
        if (weather === 'Snow') {
            return snow;
        }
        if (weather === 'Clear') {
            return sunny;
        }
        if (weather === 'Rain') {
            return rainy;
        }
        if (weather === 'Haze') {
            return haze;
        }
        return haze;
    };

    let textColor = backgroundImage !== sunny ? 'white' : 'black';

    return (
        // <View style={styles.container} >
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundImg}
            resizeMode="cover">
            <SearchBar fetchWeatherData={fetchWeatherData} />

            <View style={{ alignItems: 'center' }}>
                <Text
                    style={{
                        ...styles.headerText,
                        color: textColor,
                        fontWeight: 'bold',
                        fontSize: 46,
                    }}>
                    {name}
                </Text>
                <Text
                    style={{
                        ...styles.headerText,
                        color: textColor,
                        fontWeight: 'bold',
                    }}>
                    {main}
                </Text>
                <Text style={{ ...styles.headerText, color: textColor }}>
                    {roundTemp(temp)} °C
                </Text>
            </View>

            {/* <View style={styles.wrapper}>
                <Text style={styles.headerText}>Weather in</Text>
                <Text style={styles.text}>{weatherData?.name}</Text>
                <Text style={styles.headerText}>
                    {roundTemp(temp)}
                </Text>
                <Text style={styles.headerText}>{weather?.main}</Text>
            </View> */}
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    <Text style={{ fontSize: 22, color: 'white' }}>
                        Humidity
                    </Text>
                    <Text style={{ fontSize: 22, color: 'white' }}>
                        {humidity} %
                    </Text>
                </View>

                <View style={styles.info}>
                    <Text style={{ fontSize: 22, color: 'white' }}>
                        Wind Speed
                    </Text>
                    <Text style={{ fontSize: 22, color: 'white' }}>
                        {speed} m/s
                    </Text>
                </View>
            </View>
        </ImageBackground>
        // </View>
    );
};

export default Weather;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginTop: 120,
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width,
        padding: 8,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10,
    },
    info: {
        width: Dimensions.get('screen').width / 2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// =====================================================================
//? диструктуризация обьеста в массиве!!!
// console.log("🔥🚀 ===> Weather ===> weatherData", weatherData);
// Object {
//     "base": "stations",
//     "clouds": Object {
//       "all": 40,
//     },
//     "cod": 200,
//     "coord": Object {
//       "lat": 50.4333,
//       "lon": 30.5167,
//     },
//     "dt": 1623491773,
//     "id": 703448,
//     "main": Object {
//       "feels_like": 297.06,
//       "humidity": 46,
//       "pressure": 1012,
//       "temp": 297.38,
//       "temp_max": 297.44,
//       "temp_min": 296.09,
//     },
//     "name": "Kyiv",
//     "sys": Object {
//       "country": "UA",
//       "id": 2029227,
//       "sunrise": 1623462389,
//       "sunset": 1623521356,
//       "type": 2,
//     },
//     "timezone": 10800,
//     "visibility": 10000,
//     "weather": Array [
//       Object {
//         "description": "scattered clouds",
//         "icon": "03d",
//         "id": 802,
//         "main": "Clouds",
//       },
//     ],
//     "wind": Object {
//       "deg": 10,
//       "gust": 0,
//       "speed": 1.79,
//     },
//   }

// const { weather } = weatherData
// console.log("🔥🚀 ===> Weather ===> weather", weather);
// "weather": Array[
//     Object {
//     "description": "scattered clouds",
//         "icon": "03d",
//             "id": 802,
//                 "main": "Clouds",
//     },
//   ],

// const [{ main }] = weather
// console.log("🔥🚀 ===> Weather ===> main", main);
