import React, { useState } from 'react';
import {
    Platform,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
// import { EvilIcons } from '@expo/vector-icons';

const SearchBar = ({ fetchWeatherData }) => {
    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput
                placeholder="Enter City name"
                value={cityName}
                onChangeText={text => setCityName(text)}
            />
            <Text onPress={() => fetchWeatherData(cityName)}>Search</Text>
            {/* <EvilIcons name="search" size={28} color="black" onPress={() => fetchWeatherData(cityName)} /> */}
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    searchBar: {
        marginTop: Platform.OS === 'ios' ? 60 : 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 2,
        paddingVertical: Platform.OS === 'ios' ? 16 : 0,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: Platform.OS === 'ios' ? 24 : 12,
        backgroundColor: '#ccc',
        borderColor: '#ccc',
    },
});
