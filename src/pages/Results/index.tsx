import { h } from 'preact';
import { IconButton } from '../../object-ui/components/IconButton';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useState } from 'preact/hooks';
import { Results } from '../../types';
import { ListItem } from '../../object-ui/components/ListItem';
import { Page } from '../../object-ui/components/Page';
import styles from './Results.module.css';
import { Group } from '../../object-ui/components/Group';
import { Button } from '../../object-ui/components/Button';
export const ResultsPage = ({
  setCurrentPage,
  results,
}: {
  setCurrentPage: (page: string) => void;
  results: Results;
}) => {
  return (
    <Page>
      <div className={styles.header}>
        <IconButton
          size="small"
          onClick={() => {
            setCurrentPage('home');
          }}
        >
          <AiOutlineArrowLeft />
        </IconButton>
        <h2>Linting results</h2>
      </div>

      <Group wrap>
        <Button size="small" onClick={() => {}}>
          Don't
        </Button>
        <Button size="small" signal="success" onClick={() => {}}>
          Name
        </Button>
        <Button size="small" signal="success" onClick={() => {}}>
          Layout
        </Button>
        <Button size="small" signal="success" onClick={() => {}}>
          Color
        </Button>
        <Button size="small" signal="success" onClick={() => {}}>
          Text
        </Button>
      </Group>

      {Object.entries(results).map(([category, errors]) => (
        <div key={category}>
          <h2>{category}</h2>
          {errors.length > 0 ? (
            errors.map((error, index) => (
              <ListItem
                key={index}
                label={error.node.name}
                description={`${error.message}`}
              />
            ))
          ) : (
            <p>No issues found</p>
          )}
        </div>
      ))}
    </Page>
  );
};
