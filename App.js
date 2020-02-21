import React from "react";
import { StyleSheet, Text, View, Platform, Image, ImageBackground } from "react-native";
import About from './component/about';
import { 
  Router,
  Switch,
  Route,
  Link
 } from "./react-router";

const Home = () => (
  <View style={ styles.container }>
    <ImageBackground style={{ width: '100%', height: '100%' }} source={{ uri : 'https://wallpaperaccess.com/full/773031.jpg'}} />
  </View>
);

const App = () => (
  <Router>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/">
          <Text style={styles.text}>Home</Text>
        </Link>
        <Link to="/about">
          <Text style={styles.text}>About</Text>
        </Link>
      </View>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </View>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 22
  },
  nav:{
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: '#fff',
  }
});

export default App;