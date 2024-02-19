import { Platform, type TurboModule } from 'react-native';
import { TurboModuleRegistry, NativeModules } from 'react-native';

export type DocumentPickerResponse = {
  uri: string;
  name: string;
  copyError?: string;
  fileCopyUri: string | null;
  type: string | null;
  size: number | null;
};

export type DirectoryPickerResponse = {
  uri: string;
};

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  // we use "Object" to still have backwards compability with already
  // present methods on iOS, which use NSDictionary
  pick(options: Object): Promise<DocumentPickerResponse[]>;
  releaseSecureAccess(uris: string[]): Promise<void>;
  pickDirectory(): Promise<DirectoryPickerResponse>;
}

//TODO: add full support for New Architecture in future
export const NativeDocumentPicker =
  Platform.OS === 'ios'
    ? TurboModuleRegistry.getEnforcing<Spec>('RNDocumentPickerZowie')
    : NativeModules.RNDocumentPickerZowie;
