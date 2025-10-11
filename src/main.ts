import {
  loadFontsAsync,
  once,
  emit,
  on,
  showUI,
  traverseNode,
} from '@create-figma-plugin/utilities';

import { LINTTYPES, CRITERIA_NODE_TYPE } from './data';
import { Results, Settings, Node } from './types';

const initialSettings: Settings = {
  avoidBooleanOperation: true,
  avoidGroup: true,
  mustBeNamed: true,
  mustUseAutolayout: true,
  padding: true,
  gap: true,
  fill: true,
  stroke: true,
  cornerRadius: true,
};

export default async function () {
  on('SAVE_SETTINGS', handleSaveSettings);
  on('START', handleStart);

  on('TARGET_CLICK', handleTargetClick);


  if ((await figma.clientStorage.getAsync('settings')) === undefined) {
    await figma.clientStorage.setAsync('settings', initialSettings);
  }

  const settings = await figma.clientStorage.getAsync('settings');

  const data = {
    results: {},
    settings: settings,
  };

  showUI({ height: 600, width: 320 }, data);
}

const handleSaveSettings = async (settings: Settings) => {
  try {
    // Validate the settings object
    const expectedKeys = [
      'avoidBooleanOperation',
      'avoidGroup',
      'mustBeNamed',
      'mustUseAutolayout',
      'padding',
      'gap',
      'fill',
      'stroke',
      'cornerRadius',
    ];

    const receivedKeys = Object.keys(settings);
    const missingKeys = expectedKeys.filter(
      (key) => !receivedKeys.includes(key)
    );
    const extraKeys = receivedKeys.filter((key) => !expectedKeys.includes(key));

    if (missingKeys.length > 0) {
      console.error('Missing keys:', missingKeys);
    }
    if (extraKeys.length > 0) {
      console.error('Extra keys:', extraKeys);
    }

    await figma.clientStorage.setAsync('settings', settings);
    console.log('Settings saved successfully');
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

const handleStart = async () => {
  let results: Results = {
    avoidBooleanOperation: [],
    avoidGroup: [],
    mustBeNamed: [],
    mustUseAutolayout: [],
    padding: [],
    gap: [],
    fill: [],
    stroke: [],
    cornerRadius: [],
  };

  const settings = await figma.clientStorage.getAsync('settings');
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify('Select a layer to get started', {
      timeout: 3000,
    });
    return;
  }

  for (const frame of selection) {
    traverseNode(frame, (node) => {
      if (LINTTYPES.includes(node.type)) {
        processSingleNode(node as Node, results, settings);
      }
    });
  }

  emit('SHOW_RESULTS', results);
};

const processSingleNode = (
  node: Node,
  results: Results,
  settings: Settings
) => {
  //Check should avoid boolean operation
  if (
    settings.avoidBooleanOperation
    && node.type === 'BOOLEAN_OPERATION'
  ) {
    results.avoidBooleanOperation.push({
      type: 'avoidBooleanOperation',
      node: { id: node.id, name: node.name, type: node.type },
      message: 'Boolean operation should be avoided',
    });
  }
  //Check should avoid group
  if (
    settings.avoidGroup &&
    node.type === 'GROUP'
  ) {
    results.avoidGroup.push({
      type: 'avoidGroup',
      node: { id: node.id, name: node.name, type: node.type },
      message: 'Group should be avoided, use frame with autolayout instead',
    });
  }
  //Check must be named
  if (
    settings.mustBeNamed &&
    CRITERIA_NODE_TYPE['Must_Be_Named'].includes(node.type)
  ) {
    if (node.name.includes('Frame')) {
      results.mustBeNamed.push({
        type: 'mustBeNamed',
        node: { id: node.id, name: node.name, type: node.type },
        message: 'Frame must be named',
      });
    }
  }

  //Check must use autolayout
  if (settings.mustUseAutolayout) {
    if ('layoutMode' in node && node.layoutMode === 'NONE') {
      //If not using autolayout, push error
      results.mustUseAutolayout.push({
        type: 'mustUseAutolayout',
        node: { id: node.id, name: node.name, type: node.type },
        message: 'Frame must use autolayout',
      });
    } else {
      //if using autolayout, check if itemSpacing is assigned
      if (
        settings.gap &&
        'itemSpacing' in node &&
        node.itemSpacing !== 0 &&
        node['primaryAxisAlignItems'] !== 'SPACE_BETWEEN' &&
        !node.boundVariables?.['itemSpacing']
      ) {
        results.gap.push({
          type: 'gap',
          node: { id: node.id, name: node.name, type: node.type },
          message: 'ItemSpacing variable is not assigned',
        });
      }

      ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'].forEach(
        (padding) => {
          const paddingKey = padding as keyof typeof node;
          const boundVarKey = padding as keyof NonNullable<typeof node.boundVariables>;
          if (settings.padding && padding in node && node[paddingKey] !== 0 && node.boundVariables?.[boundVarKey] === undefined) {
            results.padding.push({
              type: 'padding',
              node: { id: node.id, name: node.name, type: node.type },
              message: `${padding} variable is not assigned`,
            });
          }
        }
      );  
    }
  }

  //Check must use variable on fill
  if (settings.fill && 'fills' in node && (node.fills as readonly Paint[])?.length > 0 && (node.boundVariables?.['fills'] === undefined || (node.boundVariables as any)?.fills?.length < (node.fills as readonly Paint[]).length) && isSolidFill(node as Node & { fills: readonly Paint[] })) {
    results.fill.push({
      type: 'fill',
      node: { id: node.id, name: node.name, type: node.type },
      message: 'Fill variable is not assigned',
    });
  }


  //Check must use variable on stroke
  if (settings.stroke && 'strokes' in node && (node.strokes as readonly Paint[])?.length > 0 && (node.boundVariables?.['strokes'] === undefined || (node.boundVariables as any)?.strokes?.length < (node.strokes as readonly Paint[]).length) && isSolidStroke(node as Node & { strokes: readonly Paint[] })) {
    results.stroke.push({
      type: 'stroke',
      node: { id: node.id, name: node.name, type: node.type },
      message: 'Stroke variable is not assigned',
    });
  }

  //Check must use variable on corner radius
  ['bottomLeftRadius', 'bottomRightRadius', 'topLeftRadius', 'topRightRadius'].forEach(
    (cornerRadius) => {
      const cornerRadiusKey = cornerRadius as keyof typeof node;
      const boundVarKey = cornerRadius as keyof NonNullable<typeof node.boundVariables>;
      if (settings.cornerRadius && cornerRadius in node && node[cornerRadiusKey] !== 0 && node.boundVariables?.[boundVarKey] === undefined) {
        results.cornerRadius.push({
          type: 'cornerRadius', 
          node: { id: node.id, name: node.name, type: node.type },
          message: `${cornerRadius} variable is not assigned`,
        });
      }
    }
  );
};

const handleTargetClick = (id: string) => {
  figma.currentPage.selection = [figma.getNodeById(id) as SceneNode];
  figma.viewport.scrollAndZoomIntoView([figma.getNodeById(id) as SceneNode]);

}

//Utils
const isSolidFill = (node: Node & { fills: readonly Paint[] }) => {
  let bool = true
  node.fills.forEach((fill: Paint) => {
    bool = bool && fill.type === 'SOLID'
  })
  return bool
}

const isSolidStroke = (node: Node & { strokes: readonly Paint[] }) => {
  let bool = true
  node.strokes.forEach((stroke: Paint) => {
    bool = bool && stroke.type === 'SOLID'
  })
  return bool
}