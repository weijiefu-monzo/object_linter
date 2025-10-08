import { render } from '@create-figma-plugin/ui';
import { emit, on } from '@create-figma-plugin/utilities';
import { h, RefObject } from 'preact';
import './object-ui/styles/primitive.css';
import './object-ui/styles/semantic.css';
import './object-ui/styles/index.css';
import { Home } from './pages/Home';
import { Settings } from './types';
import { useEffect, useState } from 'preact/hooks';
import { Results } from './types';
import { ResultsPage } from './pages/Results';

function Plugin(data: { results: object; settings: Settings }) {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [results, setResults] = useState<Results>({
    avoidBooleanOperation: [],
    avoidGroup: [],
    mustBeNamed: [],
    mustUseAutolayout: [],
    padding: [],
    gap: [],
    fill: [],
    stroke: [],
    cornerRadius: [],
  });
  useEffect(() => {
    on('SHOW_RESULTS', (results: Results) => {
      console.log(results);
      setResults(results);
      setCurrentPage('results');
    });
  }, []);
  return (
    <div>
      {currentPage === 'home' && (
        <Home settings={data.settings} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'results' && (
        <ResultsPage setCurrentPage={setCurrentPage} results={results} />
      )}
    </div>
  );
}

export default render(Plugin);
