import React from 'react';
import {LogBox, SafeAreaView, StyleSheet, Text} from 'react-native';

import type {Users} from './src/model/user';

import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient();

const UserList = () => {
  const {data = []} = useQuery('usersData', () =>
    fetch('http://localhost:3000/users/').then((res) => res.json()),
  );

  return (
    <SafeAreaView>
      {(data as Users).map(({name, email, appid}) => (
        <Text style={styles.google} key={name + email}>
          My name is {name} with email {email}, and appid - {appid}
        </Text>
      ))}
    </SafeAreaView>
  );
};
const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserList />
  </QueryClientProvider>
);

const styles = StyleSheet.create({
  google: {
    fontFamily: 'Big Shoulders Stencil Text',
  },
});

export default App;
