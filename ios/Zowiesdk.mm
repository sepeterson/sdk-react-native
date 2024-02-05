#import "Zowiesdk.h"
#import <AVFoundation/AVFoundation.h>

@implementation Zowiesdk
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(generateThumbnailFromURL:(NSString *)videoURL
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSURL *videoURLPath = [NSURL URLWithString:videoURL];
    AVURLAsset *asset = [AVURLAsset assetWithURL:videoURLPath];
    AVAssetImageGenerator *imageGenerator = [AVAssetImageGenerator assetImageGeneratorWithAsset:asset];
    imageGenerator.appliesPreferredTrackTransform = YES;
    CMTime time = CMTimeMake(1, 1);
    NSError *error;
    CGImageRef imageRef = [imageGenerator copyCGImageAtTime:time actualTime:NULL error:&error];

    if (error) {
        reject(@"THUMBNAIL_ERROR", @"Unable to generate thumbnail", error);
    } else {
        UIImage *thumbnail = [UIImage imageWithCGImage:imageRef];
        NSData *imageData = UIImagePNGRepresentation(thumbnail);
        NSString *base64Thumbnail = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
        CGImageRelease(imageRef);
        resolve(base64Thumbnail);
    }
}

@end
