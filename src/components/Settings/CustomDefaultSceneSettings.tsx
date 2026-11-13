import React, { useState } from "react";
import SettingsGroup from "../UI/SettingsGroup";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../UI/Checkbox";
import UploadImageButton from "../UI/UploadButton";

const CustomDefaultSceneSettings: React.FC = () => {
    const [allowCustomDefaultScene, setAllowCustomDefaultScene] =
        useState(false);
    const { t } = useTranslation();

    return (
        <SettingsGroup header={t("settings.custom-default-scene.header")}>
            <p>{t("settings.custom-default-scene.description")}</p>

            {allowCustomDefaultScene && (
                <>
                    <p>{t("settings.custom-default-scene.note")}</p>
                    <h3>{t("text.name-tag.header")}</h3>
                    <input type="text" name="" id="" />
                    <h3>{t("text.dialogue.header")}</h3>
                    <textarea />
                    <h3>{t("settings.custom-default-scene.images")}</h3>
                    <UploadImageButton
                        text={t(
                            "settings.custom-default-scene.upload-background",
                        )}
                        id="custom-scene-background"
                        uploadFunction={() => {}}
                    />
                    <UploadImageButton
                        text={t("settings.custom-default-scene.upload-sprite")}
                        id="custom-scene-sprite"
                        uploadFunction={() => {}}
                    />
                </>
            )}

            <Checkbox
                id="audio"
                label={t("global.enable")}
                checked={allowCustomDefaultScene}
                onChange={() =>
                    setAllowCustomDefaultScene(!allowCustomDefaultScene)
                }
            />
        </SettingsGroup>
    );
};

export default CustomDefaultSceneSettings;
