import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Modal, Button, Switch, ListItem } from '@object-ui/components';
import styles from './Home.module.css';
import { emit } from '@create-figma-plugin/utilities';
import { Settings } from '../../types';

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  savedSettings: Settings;
};

export const SettingsModal = ({
  isOpen,
  onClose,
  savedSettings,
}: SettingsModalProps) => {
  const [settings, setSettingsState] = useState(savedSettings);

  const handleSave = () => {
    try {
      // Create a simple, clean object with only primitive values
      const validatedSettings = {
        avoidBooleanOperation: !!settings.avoidBooleanOperation,
        avoidGroup: !!settings.avoidGroup,
        mustBeNamed: !!settings.mustBeNamed,
        mustUseAutolayout: !!settings.mustUseAutolayout,
        padding: !!settings.padding,
        gap: !!settings.gap,
        fill: !!settings.fill,
        stroke: !!settings.stroke,
        cornerRadius: !!settings.cornerRadius,
      };

      // Send the settings directly without serialization
      emit('SAVE_SETTINGS', validatedSettings);
      onClose();
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };
  return (
    <Modal
      title="Settings"
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <Button color="primary" onClick={handleSave} fullWidth>
          Save
        </Button>
      }
    >
      <div className={styles.settings}>
        <div className={styles.section}>
          <h3>Must avoid</h3>
          <ListItem
            label="Boolean operations"
            action={
              <Switch
                checked={settings.avoidBooleanOperation}
                onChange={() => {
                  setSettingsState({
                    ...settings,
                    avoidBooleanOperation: !settings.avoidBooleanOperation,
                  });
                }}
              />
            }
          />
          <ListItem
            label="Group"
            action={
              <Switch
                checked={settings.avoidGroup}
                onChange={() =>
                  setSettingsState({
                    ...settings,
                    avoidGroup: !settings.avoidGroup,
                  })
                }
              />
            }
          />
        </div>
        <div className={styles.section}>
          <h3>Must do</h3>
          <ListItem
            label="Use specified naming"
            action={
              <Switch
                checked={settings.mustBeNamed}
                onChange={() =>
                  setSettingsState({
                    ...settings,
                    mustBeNamed: !settings.mustBeNamed,
                  })
                }
              />
            }
          />
          <ListItem
            label="Use auto layout"
            action={
              <Switch
                checked={settings.mustUseAutolayout}
                onChange={() => {
                  setSettingsState({
                    ...settings,
                    mustUseAutolayout: !settings.mustUseAutolayout,
                  });
                }}
              />
            }
          />
        </div>
        <div className={styles.section}>
          <h3>Must apply variables</h3>
          <ListItem
            label="Padding"
            action={
              <Switch
                checked={settings.padding}
                onChange={() => {
                  setSettingsState({
                    ...settings,
                    padding: !settings.padding,
                  });
                }}
              />
            }
          />
          <ListItem
            label="Gap"
            action={
              <Switch
                checked={settings.gap}
                onChange={() => {
                  setSettingsState({
                    ...settings,
                    gap: !settings.gap,
                  });
                }}
              />
            }
          />
          <ListItem
            label="Fill"
            action={
              <Switch
                checked={settings.fill}
                onChange={() => {
                  setSettingsState({
                    ...settings,
                    fill: !settings.fill,
                  });
                }}
              />
            }
          />
          <ListItem
            label="Stroke"
            action={
              <Switch
                checked={settings.stroke}
                onChange={() => {
                  setSettingsState({
                    ...settings,
                    stroke: !settings.stroke,
                  });
                }}
              />
            }
          />
          <ListItem
            label="Corner radius"
            action={
              <Switch
                checked={settings.cornerRadius}
                onChange={() => {
                  setSettingsState({
                    ...settings,
                    cornerRadius: !settings.cornerRadius,
                  });
                }}
              />
            }
          />
        </div>
      </div>
    </Modal>
  );
};
