import {
  type HostComponent,
  requireNativeComponent,
  type ViewStyle,
} from 'react-native';

/**
 * Composes `View`.
 *
 * - src: string
 * - borderRadius: number
 * - resizeMode: 'cover' | 'contain' | 'stretch'
 */

interface Props {
  style: ViewStyle;
  isPlaying: boolean;
  url: string;
}
const VideoView: HostComponent<Props> = requireNativeComponent('VideoView');
export default VideoView;
