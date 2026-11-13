import React, { useContext } from "react";
import SettingsGroup from "../UI/SettingsGroup";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../UI/Checkbox";
import UploadImageButton from "../UI/UploadButton";
import { SettingsContext } from "../../contexts/SettingsContext";
import localforage from "localforage";
import { ICustomDefaultScene } from "../../types/ICustomDefaultScene";
import { SoftErrorContext } from "../../contexts/SoftErrorContext";

const CustomDefaultSceneSettings: React.FC = () => {
    const { t } = useTranslation();
    const settings = useContext(SettingsContext);
    const softError = useContext(SoftErrorContext);

    if (!settings || !softError) {
        throw new Error("Context not provided.");
    }
    const {
        customDefaultScene,
        setCustomDefaultScene,
        customCanvas,
        setCustomCanvas,
    } = settings;
    const { setErrorInformation } = softError;

    const handleCustomDefaultToggle = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.checked;
        setCustomCanvas(value);
        localStorage.setItem("customCanvas", String(value));
    };

    const updateCustomDefaultScene = (
        updates: Partial<ICustomDefaultScene>,
    ) => {
        const updatedScene: ICustomDefaultScene = {
            nameTag: "",
            dialogue: "",
            sprite: null,
            background: null,
            ...customDefaultScene,
            ...updates,
        };
        setCustomDefaultScene(updatedScene);
        localforage.setItem("customDefaultScene", updatedScene);
        if (updates.sprite || updates.background) {
            setErrorInformation(t("settings.custom-default-scene.prompt"));
        }
    };

    return (
        <SettingsGroup header={t("settings.custom-default-scene.header")}>
            <p>{t("settings.custom-default-scene.description")}</p>
            {customCanvas && (
                <>
                    <p>{t("settings.custom-default-scene.note")}</p>
                    <h3>{t("text.name-tag.header")}</h3>
                    <input
                        type="text"
                        value={customDefaultScene?.nameTag ?? ""}
                        onChange={(event) =>
                            updateCustomDefaultScene({
                                nameTag: event.target.value,
                            })
                        }
                    />
                    <h3>{t("text.dialogue.header")}</h3>
                    <textarea
                        value={customDefaultScene?.dialogue ?? ""}
                        onChange={(event) =>
                            updateCustomDefaultScene({
                                dialogue: event.target.value,
                            })
                        }
                        id="dialogue"
                    />
                    <h3>{t("settings.custom-default-scene.images")}</h3>
                    {(!customDefaultScene?.background ||
                        !customDefaultScene?.sprite) && (
                        <p>
                            <i className="bi bi-exclamation-triangle-fill red" />{" "}
                            {t("settings.custom-default-scene.warning")}
                        </p>
                    )}
                    <UploadImageButton
                        text={t(
                            "settings.custom-default-scene.upload-background",
                        )}
                        id="custom-scene-background"
                        uploadFunction={(file) =>
                            updateCustomDefaultScene({ background: file })
                        }
                    />
                    <UploadImageButton
                        text={t("settings.custom-default-scene.upload-sprite")}
                        id="custom-scene-sprite"
                        uploadFunction={(file) =>
                            updateCustomDefaultScene({ sprite: file })
                        }
                        alertMsg={t(
                            "settings.custom-default-scene.upload-sprite-info",
                        )}
                    />
                </>
            )}

            <Checkbox
                id="audio"
                label={t("global.enable")}
                checked={customCanvas}
                onChange={handleCustomDefaultToggle}
            />
        </SettingsGroup>
    );
};

export default CustomDefaultSceneSettings;
