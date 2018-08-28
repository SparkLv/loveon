import React, { Component } from "react";
import Nav from "./pages/nav";

import { NotificationsAndroid } from 'react-native-notifications';
import BackgroundJob from 'react-native-background-job';

export default class App extends Component {
  componentDidMount() {
    NotificationsAndroid.localNotification({
        title: 'xxxx',
        body: 'yyyyy'
    });
    BackgroundJob.schedule({
        jobKey: "myJob",
        allowExecutionInForeground: true
    });
}
  render() {
    return <Nav />;
  }
}
