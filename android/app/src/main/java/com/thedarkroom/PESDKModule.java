package com.thedarkroom;

import android.net.Uri;
import android.os.Environment;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import ly.img.android.pesdk.PhotoEditorSettingsList;
import ly.img.android.pesdk.backend.decoder.ImageSource;
import ly.img.android.pesdk.backend.model.config.CropAspectAsset;
import ly.img.android.pesdk.backend.model.constant.OutputMode;
import ly.img.android.pesdk.backend.model.state.AssetConfig;
import ly.img.android.pesdk.backend.model.state.LoadSettings;
import ly.img.android.pesdk.backend.model.state.PhotoEditorSaveSettings;
import ly.img.android.pesdk.backend.model.state.manager.SettingsList;
import ly.img.android.pesdk.ui.activity.PhotoEditorBuilder;
import ly.img.android.pesdk.ui.model.state.UiConfigAdjustment;
import ly.img.android.pesdk.ui.model.state.UiConfigAspect;
import ly.img.android.pesdk.ui.model.state.UiConfigMainMenu;
import ly.img.android.pesdk.ui.panels.AdjustmentToolPanel;
import ly.img.android.pesdk.ui.panels.TransformToolPanel;
import ly.img.android.pesdk.ui.panels.item.AdjustOption;
import ly.img.android.pesdk.ui.panels.item.CropAspectItem;
import ly.img.android.pesdk.ui.panels.item.CropResetItem;
import ly.img.android.pesdk.ui.panels.item.ToolItem;

public class PESDKModule extends ReactContextBaseJavaModule  {
    public static int PESDK_RESULT = 1;

    private PhotoEditorSettingsList createPesdkSettingsList() {
        // Create a empty new SettingsList and apply the changes on this referance.
        PhotoEditorSettingsList settingsList = new PhotoEditorSettingsList();

        // Obtain the asset config from you settingsList
        AssetConfig assetConfig = settingsList.getConfig();

        // Clear defaults and add aspect assets to the backend
        assetConfig.getAssetMap(CropAspectAsset.class).clear().add(
                CropAspectAsset.FREE_CROP,
                new CropAspectAsset("my_crop_1_1", 1, 1, false),
                new CropAspectAsset("my_crop_16_9", 16, 9, false),
                new CropAspectAsset("my_crop_9_16", 9, 16, false),
                new CropAspectAsset("my_crop_4_3", 4, 3, false),
                new CropAspectAsset("my_crop_3_4", 3, 4, false),
                new CropAspectAsset("my_crop_3_2", 3, 2, false),
                new CropAspectAsset("my_crop_2_3", 2, 3, false)
        );

        // Obtain the ui config from you settingsList
        UiConfigAspect uiConfigAspect = settingsList.getSettingsModel(UiConfigAspect.class);

        // Add aspect items to UI
        uiConfigAspect.setAspectList(
                new CropResetItem(),
                new CropAspectItem("my_crop_free", R.string.pesdk_transform_button_freeCrop, ImageSource.create(R.drawable.imgly_icon_custom_crop)),
                new CropAspectItem("my_crop_1_1", R.string.pesdk_transform_button_squareCrop),
                new CropAspectItem("my_crop_16_9"),
                new CropAspectItem("my_crop_9_16"),
                new CropAspectItem("my_crop_4_3"),
                new CropAspectItem("my_crop_3_4"),
                new CropAspectItem("my_crop_3_2"),
                new CropAspectItem("my_crop_2_3")
        );

        UiConfigAdjustment uiConfigAdjustment = settingsList.getSettingsModel(UiConfigAdjustment.class);
        uiConfigAdjustment.setOptionList(
                new AdjustOption(AdjustmentToolPanel.OPTION_BRIGHTNESS, R.string.pesdk_adjustments_button_brightnessTool, ImageSource.create(R.drawable.imgly_icon_option_brightness)),
                new AdjustOption(AdjustmentToolPanel.OPTION_EXPOSURE, R.string.pesdk_adjustments_button_exposureTool, ImageSource.create(R.drawable.imgly_icon_option_exposure)),
                new AdjustOption(AdjustmentToolPanel.OPTION_TEMPERATURE, R.string.pesdk_adjustments_button_temperatureTool, ImageSource.create(R.drawable.imgly_icon_option_tempature))
        );

        // Obtain the config
        UiConfigMainMenu uiConfigMainMenu = settingsList.getSettingsModel(UiConfigMainMenu.class);
        // Set the tools you want keep sure you licence is cover the feature and do not forget to include the correct modules in your build.gradle
        uiConfigMainMenu.setToolList(
                new ToolItem(TransformToolPanel.TOOL_ID, R.string.pesdk_transform_title_name, ImageSource.create(R.drawable.imgly_icon_tool_transform)),
                new ToolItem(AdjustmentToolPanel.TOOL_ID, R.string.pesdk_adjustments_title_name, ImageSource.create(R.drawable.imgly_icon_tool_adjust))
        );

        return settingsList;
    }

    public PESDKModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "PESDKModule";
    }

    @ReactMethod
    public void present(@NonNull String image) {
        if (getCurrentActivity() != null) {
            SettingsList settingsList = createPesdkSettingsList();
            settingsList.getSettingsModel(LoadSettings.class).setSource(Uri.parse(image));
            settingsList.getSettingsModel(PhotoEditorSaveSettings.class).setOutputToGallery(Environment.DIRECTORY_DCIM);
            settingsList.getSettingsModel(PhotoEditorSaveSettings.class).setOutputMode(OutputMode.EXPORT_IF_NECESSARY);

            new PhotoEditorBuilder(getCurrentActivity())
                    .setSettingsList(settingsList)
                    .startActivityForResult(getCurrentActivity(), PESDK_RESULT);
        }
    }
}