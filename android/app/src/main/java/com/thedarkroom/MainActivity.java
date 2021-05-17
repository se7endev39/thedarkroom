package com.thedarkroom;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration;
import androidx.annotation.NonNull;
import ly.img.android.pesdk.ui.utils.PermissionRequest;

public class MainActivity extends ReactActivity implements PermissionRequest.Response {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "TheDarkRoom";
  }

  @Override
      protected void onCreate(Bundle savedInstanceState) {
          SplashScreen.show(this, false);
          super.onCreate(savedInstanceState);
      }

  @Override
		public void onConfigurationChanged(Configuration newConfig) {
		  super.onConfigurationChanged(newConfig);
		  Intent intent = new Intent("onConfigurationChanged");
		  intent.putExtra("newConfig", newConfig);
		  this.sendBroadcast(intent);
	  }

    @Override
    public void permissionGranted() {

    }

    @Override
    public void permissionDenied() {

    }

    // Important permission request for Android 6.0 and above, don't forget to add this!
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        PermissionRequest.onRequestPermissionsResult(requestCode, permissions, grantResults);
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
