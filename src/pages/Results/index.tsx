import { h } from 'preact';
import { IconButton, ListItem, Page, Group, Button } from '@object-ui/components';
import { AiOutlineArrowLeft, AiOutlineSync } from 'react-icons/ai';
import { useState, useMemo } from 'preact/hooks';
import { Results } from '../../types';
import styles from './Results.module.css';
import { emit } from '@create-figma-plugin/utilities';
import IconGroup from '../../assets/icons/IconGroup.svg';
import IconFrame from '../../assets/icons/IconFrame.svg';
import IconComponent from '../../assets/icons/IconComponent.svg';
import IconInstance from '../../assets/icons/IconInstance.svg';
import IconText from '../../assets/icons/IconText.svg';
import IconVector from '../../assets/icons/IconVector.svg';
import IconComponentSet from '../../assets/icons/IconComponentSet.svg';

export const ResultsPage = ({
  setCurrentPage,
  results,
}: {
  setCurrentPage: (page: string) => void;
  results: Results;
}) => {

  const handleTargetClick = (id: string) => {
    emit('TARGET_CLICK', id);
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'FRAME':
        return <img src={IconFrame} alt="Group icon" width="16" height="16" />;
      case 'COMPONENT':
        return <img src={IconComponent} alt="Group icon" width="16" height="16" />;
      case 'INSTANCE':
        return <img src={IconInstance} alt="Group icon" width="16" height="16" />;
      case 'TEXT':
        return <img src={IconText} alt="Group icon" width="16" height="16" />;
      case 'VECTOR':
        return <img src={IconVector} alt="Group icon" width="16" height="16" />;
      case 'COMPONENT_SET':
        return <img src={IconComponentSet} alt="Group icon" width="16" height="16" />;
      default:
        return <img src={IconGroup} alt="Group icon" width="16" height="16" />;
  }}

  const resultsCount =  useMemo(()=>{
    return Object.values(results).reduce((acc, errors) => acc + errors.length, 0);
  }, [results])
  return (
    <Page>
      <div className={styles.header}>
        <IconButton
          size="medium"
          onClick={() => {
            setCurrentPage('home');
          }}
        >
          <AiOutlineArrowLeft />
        </IconButton>
        <h2> {resultsCount} issues found</h2>
        <IconButton
          size="medium"
          color="primary"
          signal="success"
          onClick={() => {
            emit('START');
          }}
        >
          <AiOutlineSync />
        </IconButton>
      </div>
      <ul className={styles.list}>
      {Object.entries(results).map(([category, errors]) => (
        <div key={category} className={styles.category}>
          <h3>{category}</h3>
          {errors.length > 0 ? (
            errors.map((error, index) => (
              <ListItem
                key={index}
                label={error.node.name}
                avatar={getIcon(error.node.type)}
                description={`${error.message}`}
                onClick={() => {handleTargetClick(error.node.id)}}
                outlined
              />
            ))
          ) : (
            <p>No issues found</p>
          )}
        </div>
      ))}
      </ul>
    </Page>
  );
}
