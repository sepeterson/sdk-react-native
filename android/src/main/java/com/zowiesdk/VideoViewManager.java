package com.zowiesdk;

import android.content.Context;
import android.net.Uri;
import android.widget.VideoView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.view.ViewGroup;
import android.view.View;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import android.widget.MediaController;
import android.widget.MediaController.MediaPlayerControl;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnInfoListener;
import android.widget.ProgressBar;
import android.graphics.Color;


public class VideoViewManager extends SimpleViewManager<VideoView> {
public static final String REACT_CLASS = "VideoView";
private ProgressBar progressBar;

@Override
public String getName() {
  return REACT_CLASS;
}

@Override
protected VideoView createViewInstance(ThemedReactContext reactContext) {
  VideoView videoView = new VideoView(reactContext);
    MediaController mediaController = new MediaController(reactContext);
    mediaController.setAnchorView(videoView);
    videoView.setMediaController(mediaController);
    videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
        @Override
        public void onPrepared(MediaPlayer mp) {
            float videoRatio = mp.getVideoWidth() / (float) mp.getVideoHeight();
            float screenRatio = videoView.getWidth() / (float) videoView.getHeight();
            float scaleX = videoRatio / screenRatio;
                videoView.setScaleY(1f / scaleX);
    }});
  return videoView;
}


@ReactProp(name="url")
public void setVideoPath(VideoView videoView, String urlPath) {
  Uri uri = Uri.parse(urlPath);
  videoView.setVideoURI(uri);
 }
     @ReactProp(name="isPlaying")
     public void setPauseOrPlay(VideoView videoView, Boolean isPlaying) {
     if(videoView != null) {
              if (videoView.isPlaying()) {
                  videoView.pause();
              }else {
               videoView.start();
              }
     }
   }
};
