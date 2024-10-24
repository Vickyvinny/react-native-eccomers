  #import "AppDelegate.h"
  #import <React/RCTLinkingManager.h>
  #import <React/RCTBundleURLProvider.h>
  #import <UserNotifications/UserNotifications.h>
  #import <RNCPushNotificationIOS.h>
  #import <RNGoogleSignin/RNGoogleSignin.h>
  #import <FBSDKCoreKit/FBSDKCoreKit.h>
  #import <FBSDKLoginKit/FBSDKLoginKit.h>
  #import <React/RCTLinkingManager.h>

  @implementation AppDelegate

  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {

   UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
   center.delegate = self;
    self.moduleName = @"MyApp";
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = @{};

    return [super application:application didFinishLaunchingWithOptions:launchOptions];
  }



  - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
  {
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  }
  // Required for the notification event. You must call the completion handler after handling the remote notification.
  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
  fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
  {
    [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
  }
  // Required for the registrationError event.
  - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
  {
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
  }
  // Required for localNotification event
  - (void)userNotificationCenter:(UNUserNotificationCenter *)center
  didReceiveNotificationResponse:(UNNotificationResponse *)response
          withCompletionHandler:(void (^)(void))completionHandler
  {
    [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  }

  -(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
  {
    completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
  }

  - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
  {
    return [self bundleURL];
  }

  - (NSURL *)bundleURL
  {
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  #else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
  }
  - (BOOL)application:(UIApplication *)application
    openURL:(NSURL *)url
    options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
  {
    return [RCTLinkingManager application:application openURL:url options:options];
  }


  @end
