import store from '../store';
import { NotificationsAndroid } from 'react-native-notifications';
import BackgroundJob from 'react-native-background-job';

export default class ListenMsg {
    static init() {
        const socket = store.getState().socket;
        const userInfo = store.getState().userInfo;
        const pData = store.getState().pUserInfo;
        socket.on('msgUpdate', (data) => {
            if (data.data.sid != userInfo.id) {
                NotificationsAndroid.localNotification({
                    title: pData.name,
                    body: data.data.text
                });
            }

        })
    }
    static back() {
        const backgroundJob = {
            jobKey: "myJob",
            job: () => {
                NotificationsAndroid.localNotification({
                    title: 'xxxx',
                    body: 'yyyyy'
                });
            }
        };
        BackgroundJob.register(backgroundJob);
    }
    static sc() {
        BackgroundJob.schedule({
            jobKey: "myJob",
            period: 15000
        });
    }
}