/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

var React = require('react-native')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  ListView,
  AsyncStorage
} = React

var Weather = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const openWeatherAppId = '2de143494c0b295cca9337e1e96b00e0',
  openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast' // Real API
  // openWeatherUrl = 'http://localhost:3000/' // Mock API, start with $ node weather-api

const App = React.createClass({
  getInitialState(){
    AsyncStorage.getItem('cityName').then((value) => {
      console.log('yo', value)
      if (value) this.setState({'cityName': value})
      this.refs.navigator.replacePreviousAndPop({
        component: Search,
        title: 'Search',
        passProps: {search: this.search, cityName: this.state.cityName}
      })
    }).done()
    return {isForecast: false, cityName: ''}
  },
  search(cityName, isRemember) {
    fetch(`${openWeatherUrl}/?appid=${openWeatherAppId}&q=${cityName}&units=metric`, {
      method: 'GET'
    }).then((response) => response.json())
      .then((response) => {
        if (isRemember) AsyncStorage.setItem('cityName', cityName)
        let dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        })
        this.refs.navigator.push({
          title: 'Forecast for ' + response.city.name,
          component: Forecast,
          passProps: {forecastData: dataSource.cloneWithRows(response.list)}
        })
      })
      .catch((error) => {
        console.warn(error)
      })
  },
  getRecentChats(){
    return this.state.cityName
  },
  render() {
    return (
      <NavigatorIOS ref='navigator'
        initialRoute={{
          component: Search,
          title: 'Search',
          passProps: {search: this.search, cityName: this.state.cityName}
        }}
        style={styles.navigatorContainer}
      />
    )
  }
})

const Forecast = require('./forecast.ios')
const Search = require('./search.ios.js')

AppRegistry.registerComponent('weather', () => App)
