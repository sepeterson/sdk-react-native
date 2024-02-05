package com.zowiesdk;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import java.io.ByteArrayOutputStream;
import android.graphics.Bitmap;
import android.media.ThumbnailUtils;
import android.provider.MediaStore;
import android.util.Base64;
import android.media.MediaMetadataRetriever;
import android.os.AsyncTask;

@ReactModule(name = ZowiesdkModule.NAME)
public class ZowiesdkModule extends ReactContextBaseJavaModule {
  public static final String NAME = "Zowiesdk";

  public ZowiesdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

    @ReactMethod
    public void generateThumbnailFromURL(String videoURL, Promise promise) {
        // Tworzy zadanie asynchroniczne do pobrania wideo i generacji miniatury
        AsyncTask.execute(() -> {
            try {
                MediaMetadataRetriever retriever = new MediaMetadataRetriever();
                retriever.setDataSource(videoURL, new java.util.HashMap<String, String>());
                Bitmap thumbnail = retriever.getFrameAtTime(0, MediaMetadataRetriever.OPTION_CLOSEST_SYNC);
                retriever.release();

                if (thumbnail != null) {
                    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                    thumbnail.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                    byte[] byteArray = byteArrayOutputStream.toByteArray();
                    String base64Thumbnail = Base64.encodeToString(byteArray, Base64.DEFAULT);
                    promise.resolve(base64Thumbnail);
                } else {
                    promise.reject("THUMBNAIL_ERROR", "Unable to generate thumbnail");
                }
            } catch (Exception e) {
                promise.reject("THUMBNAIL_ERROR", e.getMessage());
            }
        });
    }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }
}
