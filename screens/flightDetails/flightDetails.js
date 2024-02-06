import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const FlightResultsScreen = () => {
  const FlightDetails = useSelector(state => state.flight.flightDetails);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Airlines Results</Text>

      <FlatList
        data={FlightDetails}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.cards}>
            <Text style={styles.heading}>
              ID:
              <Text style={styles.text}>{item.id}</Text>
            </Text>
            <Text style={styles.heading}>
              Fare:
              <Text style={styles.text}> ₹{item.fare}</Text>
            </Text>

            <Text style={styles.subTitle}>Airlines</Text>
            <FlatList
              data={item.displayData.airlines}
              keyExtractor={airline => airline.airlineCode}
              renderItem={({item: airline}) => (
                <View style={styles.cardDetails}>
                  <Text style={styles.subText}>
                    Airline Code: {airline.airlineCode}
                  </Text>
                  <Text style={styles.subText}>
                    Airline Name: {airline.airlineName}
                  </Text>
                  <Text style={styles.subText}>
                    Flight Number: {airline.flightNumber}
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      />
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
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#b0c2da',
    marginVertical: 10,
  },
  heading: {
    fontWeight: '600',
    fontSize: 14,
    color: '#2E2828',
    letterSpacing: 1.5,
    width: '55%',
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#000',
    marginBottom: 10,
  },
  subText: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#b0c2da',
    marginBottom: 10,
  },
  cards: {
    backgroundColor: '#fff',
    width: '100%',
    height: 'auto',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 8,
  },
  cardDetails: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b0c2da',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 10,
  },
});

export default FlightResultsScreen;
