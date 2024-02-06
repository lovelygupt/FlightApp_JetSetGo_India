import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlightDetailsApi } from '../ApiCall/api';
import { API_URL } from '../ApiCall/apiParam';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [departureCityName, setDepartureCityName] = useState('');
  const [desinationCityName, setDesinationCityName] = useState('');
  const [filteredData, setFilteredData] = useState(FlightDetails);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const FlightDetails = useSelector((state) => state.flight.flightDetails);
  const dispatch = useDispatch();

  const handleSearch = (text) => {
    const filtered = FlightDetails.filter(item => {
      const sourceCity = item.displayData.source.airport.cityName.toLowerCase();
      const destinationCity = item.displayData.destination.airport.cityName.toLowerCase();
      const flightNumber = item.displayData.airlines[0].flightNumber;
      const airline = item.displayData.airlines[0].airlineName.toLowerCase();
      return (
        sourceCity?.includes(text?.toLowerCase()) ||
        destinationCity?.includes(text?.toLowerCase()) ||
        airline?.includes(text?.toLowerCase()) ||
        flightNumber?.includes(text) ||
        (selectedAirlines.includes(airline) &&
          item.fare >= minPrice &&
          item.fare <= maxPrice)
      );
    });
    if (flightNumber && departureCityName && desinationCityName) {
      setFilteredData(filtered);
      navigation.navigate('Search Results', {
        flightNumber,
        departureCityName,
        desinationCityName,
      });
    } else {
      alert('Please enter both departure and destination cities.');
    }
  };

  const flightDetails = ()=>{
    dispatch(FlightDetailsApi(setLoading));
  };

  useEffect(()=>{
    flightDetails();
  },[])

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Flight Result</Text>
    <Text style={styles.label}>Enter JetSetGo flight number within 48 hours of departure or arrival.</Text>
   <View style={styles.wrapper}>
   <TextInput
      style={styles.input}
      placeholder="Enter JetSetGo flight number"
      value={flightNumber}
      onChangeText={text => setFlightNumber(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Departure City Name"
      value={departureCityName}
      onChangeText={text => setDepartureCityName(text)}
    />

    <TextInput
      style={styles.input}
      placeholder="Desination City Name"
      value={desinationCityName}
      onChangeText={text => setDesinationCityName(text)}
    />
    <Pressable
        style={({ pressed }) => [
          styles.pressable,
          {
            backgroundColor: pressed ? '#4169e1cc' : '#4169e1',
          },
        ]}
        onPress={() => {handleSearch()}}
      >
        <Text style={styles.buttonText}>Get Flight Details</Text>
      </Pressable>
   </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4169e1',
    marginBottom: 10,
  },
  wrapper:{
    backgroundColor: '#fff',
    width: '100%',
    height: 'auto',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginVertical:10
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#4169e1',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    color: '#4169e1',
    fontSize: 16,
  },
  pressable: {
    padding: 12,
    borderRadius: 8,
    height: 50,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight:'500',
    color: '#000',
    marginVertical: 10,
  },
  datePickerContainer: {
    marginVertical: 20,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
