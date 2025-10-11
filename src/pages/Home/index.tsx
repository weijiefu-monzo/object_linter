import { h } from 'preact';

import { AiFillBulb, AiFillSetting, AiFillPlayCircle } from 'react-icons/ai';

import { Page, IconButton, Group, Button } from '@object-ui/components';
import { LetterGlitch } from '../../components/FigmaLetterGlitch';
import CoverImage from '../../assets/cover.svg';
import styles from './Home.module.css';
import { useState } from 'preact/hooks';

import { SettingsModal } from './SettingsModal';
import { InfoModal } from './InfoModal';
import { Settings } from '../../types';
import { emit } from '@create-figma-plugin/utilities';

export const Home = ({
  settings,
  setCurrentPage,
}: {
  settings: Settings;
  setCurrentPage: (page: string) => void;
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const handleStart = () => {
    emit('START');
  };

  return (
    <Page>
      <div className={styles.home}>
        <div className={styles.header}>
          <div className={styles.coverContainer}>
          <div className={styles.cover}>
            <LetterGlitch 
              glitchColors={['#323232', '#565656', '#707070']}
              glitchSpeed={2}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
            />
            <img src={CoverImage} alt="Object Linter" />
          </div>
          </div>
          <div className={styles.content}>
            <h1>OBJECT LINTER</h1>
            <p>Select one or more layers to get started</p>
          </div>
        </div>

        <Group fullWidth>
          <IconButton size="large" onClick={() => {
            setIsInfoOpen(true);
          }}>
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
        <InfoModal
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />
      </div>
    </Page>
  );
};