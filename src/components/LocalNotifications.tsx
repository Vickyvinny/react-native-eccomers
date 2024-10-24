import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import { Platform, Alert } from 'react-native';

const LocalNotification = async () => {
  try {
    if (Platform.OS === 'ios') {
      const granted = await PushNotificationIOS.requestPermissions();
      if (!granted) {
        Alert.alert('Notification permission denied');
        return;
      }
    } else if (Platform.OS === 'android') {
      const versionNumber = Number(Platform.Version);

      if (versionNumber >= 33) {
        const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
        const status = await check(permission);
        if (status === RESULTS.DENIED) {
          const result = await request(permission);
          if (result !== RESULTS.GRANTED) {
            Alert.alert('Notification permission denied');
            return;
          }
        } else if (status !== RESULTS.GRANTED) {
          Alert.alert('Notification permission denied');
          return;
        }
      }
    }

    const key = Date.now().toString();
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: key,
          channelName: "Local Message",
          channelDescription: "Notification for Local message",
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`)
      );
    }

    PushNotification.localNotification({
      channelId: key,
      title: 'Local Message',
      message: 'Local message !!',
    });
  } catch (error) {
    Alert.alert('Failed to display notification', 'Please try again later.');
  }
};

export default LocalNotification;
