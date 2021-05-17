//
//  PESDKModule.m
//  AwesomeProject
//
//  Created by Arctic Wolf on 2/5/21.
//

//#import <Foundation/Foundation.h>
@import PhotoEditorSDK;
#import "PESDKModule.h"
#import <React/RCTUtils.h>

@interface PESDKModule () <PESDKPhotoEditViewControllerDelegate>
@end

@implementation PESDKModule

RCT_EXPORT_MODULE(PESDK);

RCT_EXPORT_METHOD(present:(NSString *)path) {
  dispatch_async(dispatch_get_main_queue(), ^{
    PESDKConfiguration *configuration = [self buildConfiguration];
    PESDKPhotoEditViewController *photoEditViewController = [[PESDKPhotoEditViewController alloc] initWithPhotoAsset:[[PESDKPhoto alloc] initWithData:[NSData dataWithContentsOfFile:path]] configuration:configuration];
    photoEditViewController.delegate = self;

    UIViewController *currentViewController = RCTPresentedViewController();
    [currentViewController presentViewController:photoEditViewController animated:YES completion:NULL];
  });
}

#pragma mark - Configuration

- (PESDKConfiguration *)buildConfiguration {
  PESDKConfiguration *configuration = [[PESDKConfiguration alloc] initWithBuilder:^(PESDKConfigurationBuilder * _Nonnull builder) {

    // Configure editor
    [builder configurePhotoEditViewController:^(PESDKPhotoEditViewControllerOptionsBuilder * _Nonnull options) {
      //NSMutableArray<PESDKPhotoEditMenuItem *> *menuItems = [[PESDKPhotoEditMenuItem defaultItems] mutableCopy];
      //[menuItems removeLastObject]; // Remove last menu item ('Magic')
      NSMutableArray<PESDKPhotoEditMenuItem *> *menuItems = [self buildPhotoEditMenuItems];
      options.menuItems = menuItems;
    }];

    // Configure sticker tool
    [builder configureAdjustToolController:^(PESDKAdjustToolControllerOptionsBuilder * _Nonnull options) {
      // Enable personal stickers
      NSArray *adjustTools = [NSArray arrayWithObjects:[NSNumber numberWithInt:AdjustToolBrightness],[NSNumber numberWithInt:AdjustToolExposure],[NSNumber numberWithInt:AdjustToolTemperature], nil];
      options.allowedAdjustTools = adjustTools;
    }];


  }];

  return configuration;
}

#pragma mark - PhotoEditMenuItem
- (NSMutableArray<PESDKPhotoEditMenuItem *> *)buildPhotoEditMenuItems{
  NSMutableArray<PESDKPhotoEditMenuItem *> *photoEditMenuItems = [[NSMutableArray<PESDKPhotoEditMenuItem *> alloc] init];
  [photoEditMenuItems addObject:[[PESDKPhotoEditMenuItem alloc] initWithToolMenuItem:[PESDKToolMenuItem createTransformToolItem]]];
  [photoEditMenuItems addObject:[[PESDKPhotoEditMenuItem alloc] initWithToolMenuItem:[PESDKToolMenuItem createAdjustToolItem]]];
  return photoEditMenuItems;
}


#pragma mark - IMGLYPhotoEditViewControllerDelegate

- (void)photoEditViewController:(PESDKPhotoEditViewController *)photoEditViewController didSaveImage:(UIImage *)image imageAsData:(NSData *)data {
  [photoEditViewController.presentingViewController dismissViewControllerAnimated:YES completion:^{
    UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil);
    [self sendEventWithName:@"PhotoEditorDidSave" body:@{ @"image": [UIImageJPEGRepresentation(image, 1.0) base64EncodedStringWithOptions: 0], @"data": [data base64EncodedStringWithOptions:0] }];
  }];
}

- (void)photoEditViewControllerDidCancel:(PESDKPhotoEditViewController *)photoEditViewController {
  [photoEditViewController.presentingViewController dismissViewControllerAnimated:YES completion:^{
    [self sendEventWithName:@"PhotoEditorDidCancel" body:@{}];
  }];
}

- (void)photoEditViewControllerDidFailToGeneratePhoto:(PESDKPhotoEditViewController *)photoEditViewController {
  [self sendEventWithName:@"PhotoEditorDidFailToGeneratePhoto" body:@{}];
}

#pragma mark - RCTEventEmitter

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"PhotoEditorDidSave", @"PhotoEditorDidCancel", @"PhotoEditorDidFailToGeneratePhoto" ];
}

@end
