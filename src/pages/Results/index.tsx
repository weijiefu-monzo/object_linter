import { h } from 'preact';
import {
  IconButton,
  ListItem,
  Page,
  Group,
  Button,
} from '@object-ui/components';
import { AiOutlineArrowLeft, AiOutlineSync } from 'react-icons/ai';
import { useState, useMemo } from 'preact/hooks';
import { Results } from '../../types';
import styles from './Results.module.css';
import { emit } from '@create-figma-plugin/utilities';
import Icon from '../../components/Icon';
import SuccessIllustration from '../../assets/success.svg';

export const ResultsPage = ({
  setCurrentPage,
  results,
}: {
  setCurrentPage: (page: string) => void;
  results: Results;
}) => {
  const [currentTab, setCurrentTab] = useState<string>('all');

  const resultsCount = useMemo(() => {
    return Object.values(results).reduce(
      (acc, errors) => acc + errors.length,
      0
    );
  }, [results]);

  const handleTargetClick = (id: string) => {
    emit('TARGET_CLICK', id);
  };

  const getIcon = (type: string) => {
    const iconProps = {
      width: 20,
      height: 20,
      color: 'var(--color-text-secondary)',
    };

    switch (type) {
      case 'FRAME':
        return <Icon.Frame {...iconProps} />;
      case 'COMPONENT':
        return <Icon.Component {...iconProps} />;
      case 'INSTANCE':
        return <Icon.Instance {...iconProps} />;
      case 'TEXT':
        return <Icon.Text {...iconProps} />;
      case 'VECTOR':
        return <Icon.Vector {...iconProps} />;
      case 'COMPONENT_SET':
        return <Icon.ComponentSet {...iconProps} />;
      default:
        return <Icon.Group {...iconProps} />;
    }
  };

  const getFilteredCategory = (category: string) => {
    if (currentTab === 'all') return true;
    if (currentTab === 'avoid')
      return ['avoidBooleanOperation', 'avoidGroup', 'overrides'].includes(
        category
      );
    if (currentTab === 'name') return ['mustBeNamed'].includes(category);
    if (currentTab === 'spacing')
      return ['mustUseAutolayout', 'padding', 'gap', 'cornerRadius'].includes(
        category
      );
    if (currentTab === 'color') return ['fill', 'stroke'].includes(category);
  };

  const filteredResults = useMemo(() => {
    return Object.entries(results).filter(([category]) =>
      getFilteredCategory(category)
    );
  }, [results, currentTab]);

  const filteredCount = useMemo(() => {
    return filteredResults.reduce((acc, [_, errors]) => acc + errors.length, 0);
  }, [filteredResults]);

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
      <Group fullWidth>
        <Button
          size="large"
          color={currentTab === 'all' ? 'primary' : 'secondary'}
          fullWidth
          onClick={() => {
            setCurrentTab('all');
          }}
        >
          All
        </Button>
        <IconButton
          size="large"
          color={currentTab === 'avoid' ? 'primary' : 'secondary'}
          onClick={() => {
            setCurrentTab('avoid');
          }}
        >
          <Icon.Avoid
            width={24}
            height={24}
            style={{
              color:
                currentTab === 'avoid'
                  ? 'var(--primary-color)'
                  : 'var(--secondary-color)',
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          color={currentTab === 'name' ? 'primary' : 'secondary'}
          onClick={() => {
            setCurrentTab('name');
          }}
        >
          <Icon.Name
            width={24}
            height={24}
            style={{
              color:
                currentTab === 'name'
                  ? 'var(--primary-color)'
                  : 'var(--secondary-color)',
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          color={currentTab === 'spacing' ? 'primary' : 'secondary'}
          onClick={() => {
            setCurrentTab('spacing');
          }}
        >
          <Icon.Spacing
            width={24}
            height={24}
            style={{
              color:
                currentTab === 'spacing'
                  ? 'var(--primary-color)'
                  : 'var(--secondary-color)',
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          color={currentTab === 'color' ? 'primary' : 'secondary'}
          onClick={() => {
            setCurrentTab('color');
          }}
        >
          <Icon.Color
            width={24}
            height={24}
            style={{
              color:
                currentTab === 'color'
                  ? 'var(--primary-color)'
                  : 'var(--secondary-color)',
            }}
          />
        </IconButton>
      </Group>

      {filteredCount === 0 ? (
        <div className={styles.successContainer}>
          <img
            src={SuccessIllustration}
            alt="Success"
            className={styles.successImage}
          />
          <h2>{resultsCount === 0 ? 'Perfect!' : 'All clean!'}</h2>
          <p>
            {resultsCount === 0
              ? 'No linting issues found. Your design is in excellent shape!'
              : 'No issues found in this category.'}
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredResults.map(
            ([category, errors]) =>
              errors.length > 0 &&
              errors.map((error, index) => (
                <ListItem
                  key={index}
                  label={error.node.name}
                  avatar={getIcon(error.node.type)}
                  description={`${error.message}`}
                  onClick={() => {
                    handleTargetClick(error.node.id);
                  }}
                  outlined
                />
              ))
          )}
        </ul>
      )}
    </Page>
  );
};
