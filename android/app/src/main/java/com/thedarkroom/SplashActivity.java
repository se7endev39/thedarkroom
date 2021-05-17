package com.thedarkroom;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

 		Intent fcmIntent = this.getIntent();
        Bundle extras = getIntent().getExtras();

        Intent intent = new Intent(this, MainActivity.class);

         if (extras != null) {
            intent.putExtras(extras);
         }

        startActivity(intent);
        finish();
    }
}
