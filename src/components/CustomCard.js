import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class CustomCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.menuItemHeader}>
            <Text style={styles.menuItemHeaderText}>Check your KYC!</Text>
            <Text style={styles.subTilteText}>And start investing today</Text>
            <View style={styles.menuItemHeader1}>
              <Text style={styles.mutualText}>Mutual funds versus the rest</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.comparisionText}>Returns comparision</Text>
                <Text style={styles.comparisionText}>3 yr annualised returns</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  menuContainer: {
    borderRadius: 10,
    margin: 10,
    marginTop: 2,
    backgroundColor: 'white', // Set your background color
  },
  menuItemHeader: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 0.5
  },
  menuItemHeader1: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    //padding: 80,
    borderWidth: 0.5,
    paddingBottom: 30
    //marginHorizontal: -10
  },
  menuItemHeaderText: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#97f19e',
    paddingHorizontal: 12,
  },
  menuItemBody: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'gray',
    borderTopWidth: 0,
    alignSelf: 'stretch',
    padding: 10,
  },
  subTilteText: {
    fontSize: 15,
    color: '#000',
    padding: 12
  },
  mutualText: {
    fontSize: 18,
    color: '#000',
    padding: 12,
    fontWeight: 'bold'
  },
  comparisionText: {
    fontSize: 12,
    color: '#000',
    padding: 12
  }
});
