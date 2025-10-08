export const LINTTYPES = [
  //   "BOOLEAN_OPERATION",
  'COMPONENT',
  'COMPONENT_SET',
  'TEXT',
  'GROUP',
  'FRAME',
  'INSTANCE',
  'VECTOR',
];
export const CRITERIA_NODE_TYPE = {
  Should_Avoid: ['BOOLEAN_OPERATION', 'GROUP'],
  Must_Be_Named: ['COMPONENT', 'COMPONENT_SET', 'FRAME', 'INSTANCE'],
  Must_Use_Autolayout: ['COMPONENT', 'FRAME', 'INSTANCE'],
  Must_Use_Variable: ['COMPONENT', 'FRAME', 'INSTANCE'],
};

export const IGNORE = {
  Layer: [
    'Scroll Bar / Vertical',
    'Scroll Bar / Horizontal',
    '🎚 Width Control',
    'Vector',
    'Avatar',
  ],
  Property: {
    fillType: [
      'GRADIENT_LINEAR',
      'GRADIENT_RADIAL',
      'GRADIENT_ANGULAR',
      'GRADIENT_DIAMOND',
      'Image',
    ],
  },
};
