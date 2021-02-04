import React, {useRef} from 'react';
import {Animated, LogBox, SafeAreaView, StyleSheet, Text} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient();

const UserList = () => {
  const Y = useRef(new Animated.Value(0)).current;

  const inputRange = [-10, 0, 10];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: Y,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}>
        <Animated.View
          style={[
            styles.hint,
            {
              opacity: Y.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              }),
            },
            {
              transform: [
                {
                  translateY: Y.interpolate({
                    inputRange,
                    outputRange: [20, 0, -20],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.fontFamily}>Activated</Text>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserList />
  </QueryClientProvider>
);

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'Big Shoulders Stencil Text',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    borderColor: 'red',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 5,
  },
});

export default App;
