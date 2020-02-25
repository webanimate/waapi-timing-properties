import { isObject, isEmpty, isArray, isString } from 'underscore'

const properties = {
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

const propertiesNames = []
Object.keys(properties).forEach(key => {
  propertiesNames.push(key)
})

const isValidPropertyValue = (key, value) => {
  const property = properties[key]
  if (property) {
    if (property.type === 'Number') {
      if (!(value >= property.min && value <= property.max)) {
        return false
      }
    } else if (property.type === 'String') {
      if (property.values) {
        value = value
          .toString()
          .replace(/\s+\(/g, '(')
          .trim()
        const bracketPosition = value.indexOf('(')
        if (bracketPosition > 0) {
          value = value.substring(0, bracketPosition + 1)
        }
        for (const propertyValue of property.values) {
          if (value === propertyValue) {
            return true
          }
        }
        return false
      }
      return true
    }
    return true
  }
  return false
}

const sanitize = (obj, checkValue = true, returnDefault = true) => {
  let _properties
  if (isArray(obj)) {
    _properties = []
  } else if (isObject(obj)) {
    _properties = {}
  }
  if (!isEmpty(obj)) {
    if (!isArray(obj) && isObject(obj)) {
      Object.keys(obj).forEach(key => {
        if (key in properties) {
          if (checkValue) {
            if (!isValidPropertyValue(key, obj[key])) {
              if (returnDefault && properties[key].default !== undefined) {
                _properties[key] = properties[key].default
              }
            } else {
              _properties[key] = obj[key]
            }
          } else {
            _properties[key] = obj[key]
          }
        }
      })
    } else if (isArray(obj)) {
      for (const key of obj) {
        if (propertiesNames.includes(key)) {
          _properties.push(key)
        }
      }
      return _properties
    }
  }
  return _properties
}

const validate = (obj, checkValue = true) => {
  if (!isEmpty(obj)) {
    if (!isArray(obj) && isObject(obj)) {
      for (const key of Object.keys(obj)) {
        if (!(key in properties)) {
          return false
        } else if (checkValue) {
          if (!isValidPropertyValue(key, obj[key])) {
            return false
          }
        }
      }
      return true
    } else if (isArray(obj)) {
      for (const key of obj) {
        if (!propertiesNames.includes(key)) {
          return false
        }
      }
      return true
    } else if (isString(obj) && propertiesNames.includes(obj)) {
      return true
    }
  }
  return false
}

export { properties, propertiesNames, sanitize, validate }
