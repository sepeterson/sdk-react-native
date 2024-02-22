import { NativeModules } from 'react-native';

import type {
  CameraOptions,
  ImageLibraryOptions,
  Callback,
  ImagePickerResponse,
} from '../../types/imagePicker';

const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
  mediaType: 'photo',
  videoQuality: 'high',
  quality: 1,
  maxWidth: 0,
  maxHeight: 0,
  includeBase64: false,
  cameraType: 'back',
  selectionLimit: 1,
  saveToPhotos: false,
  durationLimit: 0,
  includeExtra: false,
  presentationStyle: 'pageSheet',
  assetRepresentationMode: 'auto',
};

const nativeImagePicker = NativeModules.ImagePickerZowie;

export function camera(
  options: CameraOptions,
  callback?: Callback
): Promise<ImagePickerResponse> {
  return new Promise((resolve) => {
    nativeImagePicker.launchCamera(
      { ...DEFAULT_OPTIONS, ...options },
      (result: ImagePickerResponse) => {
        if (callback) callback(result);
        resolve(result);
      }
    );
  });
}

export function imageLibrary(
  options?: ImageLibraryOptions,
  callback?: Callback
): Promise<ImagePickerResponse> {
  return new Promise((resolve) => {
    nativeImagePicker.launchImageLibrary(
      { ...DEFAULT_OPTIONS, ...options },
      (result: ImagePickerResponse) => {
        if (callback) callback(result);
        resolve(result);
      }
    );
  });
}
