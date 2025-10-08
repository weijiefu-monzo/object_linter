import { h } from 'preact';

import { AiFillBulb, AiFillSetting, AiFillPlayCircle } from 'react-icons/ai';

import { Page } from '../../object-ui/components/Page';
import CoverImage from '../../assets/cover.png';
import styles from './Home.module.css';
import { IconButton } from '../../object-ui/components/IconButton';
import { Group } from '../../object-ui/components/Group';
import { Button } from '../../object-ui/components/Button';
import { useEffect, useState } from 'preact/hooks';

import { SettingsModal } from './SettingsModal';
import { Settings } from '../../types';
import { emit, on } from '@create-figma-plugin/utilities';

export const Home = ({
  settings,
  setCurrentPage,
}: {
  settings: Settings;
  setCurrentPage: (page: string) => void;
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const handleStart = () => {
    emit('START');
  };

  return (
    <Page>
      <div className={styles.home}>
        <div className={styles.header}>
          <div className={styles.cover}>
            <img src={CoverImage} alt="Object Linter" />
          </div>
          <div className={styles.content}>
            <h1>OBJECT LINTER</h1>
            <p>Select a layer to get started</p>
          </div>
        </div>

        <Group fullWidth>
          <IconButton size="large" onClick={() => {}}>
            <AiFillBulb />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => {
              setIsSettingsOpen(true);
            }}
          >
            <AiFillSetting />
          </IconButton>
          <Button
            color="primary"
            startIcon={<AiFillPlayCircle />}
            fullWidth
            size="large"
            signal="success"
            onClick={handleStart}
          >
            Start
          </Button>
        </Group>
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          savedSettings={settings}
        />
      </div>
    </Page>
  );
};
