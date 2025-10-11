import { h } from 'preact';
import { Modal, Button } from '@object-ui/components';
import styles from './Home.module.css';
import InfoImage from '../../assets/crowd.svg';
export const InfoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const handleSlackWeijie = () => {
    window.open('https://monzo.enterprise.slack.com/team/U09KRGW7H88', '_blank');
  };
  return (
    <Modal title="Welcome to Object Linter" isOpen={isOpen} onClose={onClose} actions={<Button color="primary" fullWidth onClick={handleSlackWeijie}>Talk to Weijie on Slack</Button>}>
      <div className={styles.info}>
        <img src={InfoImage} alt="Crowd"  className={styles.infoImage}/>
        <p><strong>Object Linter</strong> helps you keep Figma files clean and handoff-ready.</p>
        <p>It scans every node and flags common issues—like <strong>unnamed frames, missing Auto Layout, and hard-coded values instead of variables.</strong> Following these rules makes your files consistent, faster to maintain, and easier for developers to implement.</p>
        <p>Use Settings to turn rules on/off so the linter fits your workflow.</p>
        <p>Built by Weijie Fu. Missing something or found a bug? Ping Weijie on Slack.</p>
      </div>
    </Modal>
  );
};