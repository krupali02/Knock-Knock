import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Constants from 'expo-constants';
import CardFlip from 'react-native-card-flip';
import RNRestart from 'react-native-restart';
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    data: {
      activity: 'Loading...',
    },
  };

  getJsonData = () => {
    fetch(
      'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit,religious,political&type=twopart',
      { method: 'GET' }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          data: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getJsonData();
  };

  restt = () => {
    RNRestart.Restart();
  };

  render() {
    return (
      <View style={styles.container}>
        <CardFlip
          style={styles.cardContainer}
          flipDirection="x"
          ref={(card) => (this.card = card)}>
          <TouchableOpacity
            activeOpacity="100"
            style={styles.card1}
            onPress={() => this.card.flip()}>
            <Text style={styles.label}>{this.state.data['setup']}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity="100"
            style={styles.card2}
            onPress={() => this.card.flip()}>
            <Text style={styles.label}>
              {'Answer: ' + this.state.data['delivery']}
            </Text>
          </TouchableOpacity>
        </CardFlip>
        <Button
          style={styles.bu}
          title="Give Me Another Joke!"
          onPress={this.getJsonData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  cardContainer: {
    width: 320,
    height: 170,
    marginBottom: 40,
  },

  card1: {
    backgroundColor: '#FE474C',
    width: 320,
    height: 170,
    padding: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },

  card2: {
    backgroundColor: '#FEB12C',
    width: 320,
    height: 170,
    padding: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },

  label: {
    lineHeight: 170,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
    display: 'inline-block',
    position: 'relative',
  },

  bu: {
    fontSize: 180,
    marginTop: 90,
  },
});
