import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

const SearchResultsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(FlightDetails);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const FlightDetails = useSelector((state) => state.flight.flightDetails);

  const handleSearch = text => {
    const filtered = FlightDetails.filter(item => {
      const sourceCity = item.displayData.source.airport.cityName.toLowerCase();
      const destinationCity = item.displayData.destination.airport.cityName.toLowerCase();
      const flightNumber = item.displayData.airlines[0].flightNumber;
      const airline = item.displayData.airlines[0].airlineName.toLowerCase();
      return (
        sourceCity.includes(text.toLowerCase()) ||
        destinationCity.includes(text.toLowerCase()) ||
        airline.includes(text.toLowerCase()) ||
        flightNumber.includes(text) ||
        (selectedAirlines.includes(airline) &&
          item.fare >= minPrice &&
          item.fare <= maxPrice)
      );
    });

    setFilteredData(filtered);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.displayData.source.airport.cityName} -{' '}
        {item.displayData.destination.airport.cityName}
      </Text>
      <Text style={styles.itemText}>
        Airline: {item.displayData.airlines[0].airlineName}
      </Text>
      <Text style={styles.itemText}>Price: ₹{item.fare}</Text>
      <Text style={styles.itemText}>
        Flight Number: {item.displayData.airlines[0].flightNumber}
      </Text>
    </View>
  );

  const noResultsFound = () => {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>No results found</Text>
        <Text style={styles.noResultsSubText}>
          Try adjusting your search or filters
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Flight Details Here</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholder="Search"
        />
        <TouchableOpacity
          onPress={() => handleSearch(searchText)}
          style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={noResultsFound}
        style={{
          marginTop: 45,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4169e1',
    marginBottom: 10,
  },
  searchContainer: {
    height: 100,
  },
  searchInput: {
    height: 45,
    width: '100%',
    borderColor: '#4169e1',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginVertical: 10,
  },
  searchButton: {
    height: 45,
    backgroundColor: '#4169e1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginVertical: 10,
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
  },
  itemContainer: {
    backgroundColor: '#b0c2da',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noResultsImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  noResultsSubText: {
    color: 'gray',
    fontSize: 16,
  },
});

export default SearchResultsScreen;
