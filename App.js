/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
}
from 'react-native';

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard PIPPO to reload,\n' +
    'Shake or press menu button for dev menu',
});

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

export default class App extends Component<{}> {
  
  constructor(props) {
    super(props); 
    this.state = {
      //movies: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          //movies: responseData.movies,
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    //var movies = MOCKED_MOVIES_DATA[0];

    // if (!this.state.movies) {
    //   return this.renderLoadingView();
    // }

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
          <View>
              <Text style={styles.welcome}>
                Welcome to React Native Riccardo!
              </Text>
              <Text style={styles.instructions}>
                To get started, edit App.js
              </Text>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
              />
          </View>
      );

  

    //var movie = this.state.movies[0];
    //return this.renderMovie(movie);

    
   /*return (
        <View style={styles.container}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      );*/

    /*return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );*/
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

 var styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      thumbnail: {
        width: 53,
        height: 77,
      },
      rightContainer: {
        flex: 1,
      },
      title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
      },
      year: {
        textAlign: 'center',
      },
      listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
      },
      welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 15,
      },
    });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
