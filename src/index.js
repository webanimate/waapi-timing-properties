export const options = {
  id: {
    type: 'String'
  },

  delay: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },

  direction: {
    type: 'String',
    values: [
      'normal', //
      'reverse',
      'alternate',
      'alternate-reverse'
    ],
    default: 'normal'
  },

  duration: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },

  easing: {
    type: 'String',
    values: [
      'linear', //
      'cubic-bezier(',
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
      'steps(',
      'step-start',
      'step-end'
    ],
    default: 'linear'
  },

  endDelay: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },

  fill: {
    type: 'String',
    values: [
      'none', //
      'forwards',
      'backwards',
      'both',
      'auto'
    ],
    default: 'auto'
  },

  iterationStart: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },

  iterations: {
    type: 'Number',
    min: 0,
    max: Infinity,
    default: 0
  },

  composite: {
    type: 'String',
    values: [
      'add', //
      'accumulate',
      'replace'
    ],
    default: 'replace'
  },

  iterationComposite: {
    type: 'String',
    values: [
      'accumulate', //
      'replace'
    ],
    default: 'replace'
  }
}

export const sanitize = (obj, returnDefault = false) => {
  if (returnDefault) {
    return true
  }
  const _options = {}
  Object.keys(obj).forEach(function(key) {
    if (key in options) {
      _options[key] = obj[key]
    }
  })
  return _options
}
