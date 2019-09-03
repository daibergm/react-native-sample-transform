/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import {Colors} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  state = {
    screenWidth: width,
    screenHeight: height,
    orientation: '',
  };

  updateSizeHandler = ({window: {width: _width, height: _height} = {}}) =>
    this.setState({screenWidth: _width, screenHeight: _height});

  _onOrientationDidChange = orientation => {
    if (orientation !== 'PORTRAIT') {
      this.setState({orientation: 'landScape'});
      return;
    }

    this.setState({orientation: 'portrait'});
  };

  componentDidMount() {
    Orientation.getOrientation(this._onOrientationDidChange);
    Dimensions.addEventListener('change', this.updateSizeHandler);
    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener('change', this.updateSizeHandler);
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  render() {
    const {screenWidth, screenHeight, orientation} = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.body}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Hello React</Text>
            </View>
            <View
              style={styles.child1(screenWidth, screenHeight, orientation)}
            />
            <View style={styles.child2(screenWidth, screenHeight, orientation)}>
              <View
                style={styles.corners1Container(
                  screenWidth,
                  screenHeight,
                  orientation,
                )}>
                <View style={styles.child1CornerLeft(orientation)} />
                <View style={styles.child1CornerRight(orientation)} />
              </View>
            </View>
            <View style={styles.child3(screenWidth, screenHeight, orientation)}>
              <View
                style={styles.corners1Container(
                  screenWidth,
                  screenHeight,
                  orientation,
                )}>
                <View style={styles.child2CornerLeft(orientation)} />
                <View style={styles.child2CornerRight(orientation)} />
              </View>
            </View>
          </View>
          <View style={{flex: 1}} />
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: Colors.black,
    position: 'relative',
    height: 300,
    zIndex: 0,
    flex: 1,
  },
  child1: (screenWidth, screenHeight, orientation) => {
    const baseWidth = orientation === 'portrait' ? screenWidth : screenHeight;

    return {
      position: 'absolute',
      borderLeftWidth: screenWidth / 2,
      borderRightWidth: screenWidth / 2,
      borderTopWidth: baseWidth / 4,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'green',
      borderStyle: 'solid',
      bottom: (baseWidth / 4) * -1,
      zIndex: 1,
    };
  },
  child2: (screenWidth, screenHeight, orientation) => {
    const baseWidth = orientation === 'portrait' ? screenWidth : screenHeight;

    return {
      width: 0,
      height: 0,
      position: 'absolute',
      borderLeftWidth: screenWidth / 2,
      borderRightWidth: screenWidth / 2,
      borderTopWidth: baseWidth / 4,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'blue',
      borderStyle: 'solid',
      bottom: (baseWidth / 4) * -1 + 15,
      zIndex: 2,
    };
  },
  corners1Container: (screenWidth, screenHeight, orientation) => {
    const baseWidth = orientation === 'portrait' ? screenWidth : screenHeight;

    return {
      position: 'relative',
      width: screenWidth,
      height: baseWidth / 4,
      backgroundColor: 'transparent',
      marginTop: (baseWidth / 4) * -1,
      marginLeft: (screenWidth / 2) * -1,
    };
  },
  child1CornerLeft: orientation => {
    const baseTop = orientation === 'portrait' ? -7 : -19;
    const baseLeft = orientation === 'portrait' ? 8 : 21;
    const baseWidth = orientation === 'portrait' ? 30 : 54;

    return {
      position: 'absolute',
      borderStyle: 'solid',
      borderRightWidth: 15,
      borderRightColor: 'transparent',
      borderTopWidth: baseWidth,
      borderTopColor: 'green',
      transform: [{ rotate: '-90deg' }],
      top: baseTop,
      left: baseLeft,
    };
  },
  child1CornerRight: orientation => {
    const baseTop = orientation === 'portrait' ? -7 : -19;
    const baseRight = orientation === 'portrait' ? 8 : 21;
    const baseWidth = orientation === 'portrait' ? 30 : 54;

    return {
      position: 'absolute',
      borderStyle: 'solid',
      borderLeftWidth: 15,
      borderLeftColor: 'transparent',
      borderTopWidth: baseWidth,
      borderTopColor: 'green',
      transform: [{ rotate: '90deg' }],
      top: baseTop,
      right: baseRight,
    };
  },
  child3: (screenWidth, screenHeight, orientation) => {
    const baseWidth = orientation === 'portrait' ? screenWidth : screenHeight;

    return {
      width: 0,
      height: 0,
      position: 'absolute',
      borderLeftWidth: screenWidth / 2,
      borderRightWidth: screenWidth / 2,
      borderTopWidth: baseWidth / 4,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'black',
      borderStyle: 'solid',
      bottom: (baseWidth / 4) * -1 + 30,
      zIndex: 3,
    };
  },
  child2CornerLeft: orientation => {
    const baseTop = orientation === 'portrait' ? -7 : -19;
    const baseLeft = orientation === 'portrait' ? 8 : 21;
    const baseWidth = orientation === 'portrait' ? 30 : 54;

    return {
      position: 'absolute',
      borderStyle: 'solid',
      borderRightWidth: 15,
      borderRightColor: 'transparent',
      borderTopWidth: baseWidth,
      borderTopColor: 'blue',
      transform: [{ rotate: '-90deg' }],
      top: baseTop,
      left: baseLeft,
    };
  },
  child2CornerRight: orientation => {
    const baseTop = orientation === 'portrait' ? -7 : -19;
    const baseRight = orientation === 'portrait' ? 8 : 21;
    const baseWidth = orientation === 'portrait' ? 30 : 54;

    return {
      position: 'absolute',
      borderStyle: 'solid',
      borderLeftWidth: 15,
      borderLeftColor: 'transparent',
      borderTopWidth: baseWidth,
      borderTopColor: 'blue',
      transform: [{ rotate: '90deg' }],
      top: baseTop,
      right: baseRight,
    };
  },
});

export default App;
