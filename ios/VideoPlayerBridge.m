#import <Foundation/Foundation.h>
#import "VideoPlayerBridge.h"
#import <React/RCTBridgeModule.h>
#import <AVKit/AVKit.h>
#import <AVFoundation/AVFoundation.h>

@implementation VideoPlayerBridge

RCT_EXPORT_MODULE(VideoPlayerBridge)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(renderVideoFromUrl: (NSString *)urlString) {
  NSURL *url = [NSURL URLWithString:urlString];
  AVPlayer *player = [[AVPlayer alloc] initWithURL:url];
  BOOL isPlayable = [[AVAsset assetWithURL:url] isPlayable];
  if(!isPlayable){
    return @(NO);
  }
  dispatch_async(dispatch_get_main_queue(), ^{
    AVPlayerViewController *viewController = [[AVPlayerViewController alloc] init];
    viewController.player = player;
    viewController.player.volume = 1;
    viewController.showsPlaybackControls = YES;
    viewController.videoGravity = AVLayerVideoGravityResizeAspect;

    UIWindow *window = [[UIApplication sharedApplication] keyWindow];
    UIViewController *rootViewController = window.rootViewController;
    [rootViewController presentViewController:viewController animated:true completion:^{
      [player play];
    }];
  });
  return urlString;
}

@end
