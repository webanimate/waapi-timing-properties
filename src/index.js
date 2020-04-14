import isObject from 'lodash.isobject'
import isString from 'lodash.isstring'
import isNumber from 'lodash.isnumber'

const properties = {
  id: {
    type: 'String',
  },

  delay: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0,
  },

  direction: {
    type: 'String',
    values: [
      'normal', //
      'reverse',
      'alternate',
      'alternate-reverse',
    ],
    default: 'normal',
  },

  duration: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0,
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
      'step-end',
    ],
    default: 'linear',
  },

  endDelay: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0,
  },

  fill: {
    type: 'String',
    values: [
      'none', //
      'forwards',
      'backwards',
      'both',
      'auto',
    ],
    default: 'none',
  },

  iterationStart: {
    type: 'Number',
    min: 0,
    max: Number.MAX_VALUE,
    default: 0,
  },

  iterations: {
    type: 'Number',
    min: 0,
    max: Infinity,
    default: 1,
  },

  composite: {
    type: 'String',
    values: [
      'add', //
      'accumulate',
      'replace',
      'auto',
    ],
    default: 'replace',
  },

  iterationComposite: {
    type: 'String',
    values: [
      'accumulate', //
      'replace',
    ],
    default: 'replace',
  },
}

const propertiesNames = []
Object.keys(properties).forEach((key) => {
  propertiesNames.push(key)
})

const isCssNumber = (string) => {
  return /^[-+]?\d*\.?\d+([eE]?[-+]?\d+)?$/.test(string.trim())
}

const isCssPositiveInteger = (string) => {
  return /^[+]?\d+?$/.test(string.trim()) && Number(string) > 0
}

const checkCubicBezier = (value) => {
  const numbers = value.substring(13, value.length - 1).split(',')
  if (numbers.length === 4) {
    for (const index of numbers.keys()) {
      if (!isCssNumber(numbers[index])) {
        return false
      }
      if ([0, 2].includes(index)) {
        if (Number(numbers[index]) < 0 || Number(numbers[index]) > 1) {
          return false
        }
      }
    }
    return true
  }
  return false
}

const checkSteps = (value) => {
  const values = value.substring(6, value.length - 1).split(',')
  if (values.length > 2) {
    return false
  }
  if (!isCssPositiveInteger(values[0])) {
    return false
  }
  if (values[1] && !['end', 'start', 'jump-both', 'jump-none', 'jump-end', 'jump-start'].includes(values[1].trim())) {
    return false
  }
  return true
}

const isValidPropertyValue = (key, value) => {
  if (!isNumber(value) && !isString(value)) {
    return false
  }
  const property = properties[key]
  if (property.type === 'Number') {
    if (!(value >= property.min && value <= property.max)) {
      return false
    }
  } else {
    if (property.values) {
      value = value.toString()
      const bracketPosition = value.indexOf('(')
      if (bracketPosition > 0) {
        if (key === 'easing') {
          if (value.substring(value.length - 1) !== ')') {
            return false
          }
          if (value.substring(0, 13) === 'cubic-bezier(') {
            return checkCubicBezier(value)
          } else if (value.substring(0, 6) === 'steps(') {
            return checkSteps(value)
          } else {
            return false
          }
        }
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

const removeExtraSpaces = (value) => {
  if (isString(value)) {
    value = value.trim().replace(/\s+/g, ' ').replace(/\( /, '(').replace(/ \)/, ')').replace(' ,', ',')
  }
  return value
}

const sanitize = (obj, checkValues = true, returnDefault = true) => {
  let _properties
  if (Array.isArray(obj)) {
    _properties = []
  } else if (isObject(obj)) {
    _properties = {}
  }
  if (Object.keys(obj).length) {
    if (Array.isArray(obj)) {
      for (const key of obj) {
        if (propertiesNames.includes(key)) {
          _properties.push(key)
        }
      }
    } else if (isObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (key in properties) {
          obj[key] = removeExtraSpaces(obj[key])
          if (checkValues) {
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
    } else {
      _properties = ''
      if (validate(obj)) {
        _properties = obj
      }
    }
  }
  return _properties
}

const validate = (obj, checkValues = true, returnFirstInvalidProperty = false) => {
  if (Object.keys(obj).length) {
    if (Array.isArray(obj)) {
      for (const key of obj) {
        if (!propertiesNames.includes(key)) {
          return returnFirstInvalidProperty ? key : false
        }
      }
      return true
    } else if (isObject(obj)) {
      for (const key of Object.keys(obj)) {
        if (!(key in properties)) {
          return returnFirstInvalidProperty ? `${key}: ${obj[key]}` : false
        } else if (checkValues) {
          obj[key] = removeExtraSpaces(obj[key])
          if (!isValidPropertyValue(key, obj[key])) {
            return returnFirstInvalidProperty ? `${key}: ${obj[key]}` : false
          }
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
