import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';

import { NotificationsAndroid } from 'react-native-notifications';
import BackgroundJob from 'react-native-background-job';

const backgroundJob = {
    jobKey: "myJob",
    job: () => {
        setInterval(() => {
            NotificationsAndroid.localNotification({
                title: 'mmmm',
                body: 'yyyyy'
            });
        }, 2000)
    }
};
BackgroundJob.register(backgroundJob);

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('loveon', () => App);
