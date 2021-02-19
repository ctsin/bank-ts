import React, {useRef} from 'react';
import {Animated, LogBox, SafeAreaView, StyleSheet, Text} from 'react-native';

import {Loading} from './src/components/loading';

import styled from 'styled-components/native';

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
        <AnimatedViewStyled
          elevation={2}
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
        </AnimatedViewStyled>

        <Loading />
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
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    padding: 10,
    borderRadius: 5,
  },
});

type ViewStyledProps = {
  elevation?: number;
};

const AnimatedViewStyled = styled(Animated.View)<ViewStyledProps>`
  box-shadow: ${({elevation = 10}) => `0 0 ${elevation}px rgba(0, 0, 0, 0.2)`};
  background-color: white;
`;

AnimatedViewStyled.displayName = 'Hello';

export default App;
