# WAAPI timing properties

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/waapi-timing-properties.svg)](https://www.npmjs.com/package/waapi-timing-properties)
[![](https://img.shields.io/bundlephobia/minzip/waapi-timing-properties.svg)](https://bundlephobia.com/result?p=waapi-timing-properties)
[![Depfu](https://badges.depfu.com/badges/60fa0ec271d59de743b3dce301e72ff1/count.svg)](https://depfu.com/github/webanimate/waapi-timing-properties?project_id=11419)
[![codecov](https://codecov.io/gh/webanimate/waapi-timing-properties/branch/master/graph/badge.svg)](https://codecov.io/gh/webanimate/waapi-timing-properties)
[![Build Status](https://app.travis-ci.com/webanimate/waapi-timing-properties.svg?branch=master)](https://app.travis-ci.com/webanimate/waapi-timing-properties)

List of [timing properties](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) and their possible values for animation effects used in [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

It can be used to `validate()` and `sanitize()` options passed to [Element.animate()](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [KeyframeEffectReadOnly()](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffectReadOnly/KeyframeEffectReadOnly) and [KeyframeEffect()](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect). Here's an [example](https://github.com/webanimate/animate.web/blob/master/test/index.test.js).

[DEMO](https://webanimate.github.io/waapi-timing-properties/) and its [source code](https://github.com/webanimate/waapi-timing-properties/blob/master/index.html).

## Install

```
$ yarn add waapi-timing-properties
```

or

```
$ npm install waapi-timing-properties
```

## Usage

Import all functionality into one object:

```javascript
import * as WTProperties from 'waapi-timing-properties'
```

Or import only what you need:

```javascript
import { properties, propertiesNames, sanitize, validate } from 'waapi-timing-properties'
```

Or load from CDN:

```html
<!-- Either -->
<script src="https://unpkg.com/waapi-timing-properties"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/waapi-timing-properties@latest/dist/wtproperties.js"></script>
```

`WTProperties.properties` is an object containing properties names and their possible values.

The structure of the object is this:

```javascript
WTProperties.propertiesNames.forEach((property) => {
  const object = WTProperties.properties[property]
})
```

`object.default` is the default value of the property.

`object.type` is either `'Number'` or `'String'`.

If `object.type === 'Number'` then

`object.min` is its minimal possible value

`object.max` is its maximal possible value

If `object.type === 'String'` then

`object.values` is an array of possible values.

For `easing` property there is also

`object.valuesCubicBezier` object which contains cubic-bezier equivalents of `linear`, `ease`, `ease-in`, `ease-out` and `ease-in-out`

and

`object.valuesSteps` object which contains steps equivalents of `step-start` and `step-end`

`WTProperties.propertiesNames` is an array containing only properties names.

`WTProperties.sanitize` has two optional arguments:

`WTProperties.sanitize(objectArrayOrStringToCheck, checkValues = true, returnDefault = true)`

`WTProperties.validate` also has two optional arguments:

`WTProperties.validate(objectArrayOrStringToCheck, checkValues = true, returnFirstInvalidProperty = false)`

Let's sanitize and validate some options:

```javascript
const options = {
  duration: -1000,
  easing: 'not easy',
  iterations: 3,
  someInvalidOption: 123,
}
```

Use `WTProperties.sanitize(options)` to remove properties with invalid names and replace properties with valid names but invalid values with their default values:

```javascript
WTProperties.sanitize(options) ===
  {
    duration: 0,
    easing: 'linear',
    iterations: 3,
  }
WTProperties.validate(options) === true
```

Use `sanitize(options, true, false)` to remove all properties with invalid names and/or values:

```javascript
WTProperties.sanitize(options, true, false) ===
  {
    iterations: 3,
  }
WTProperties.validate(options) === true
```

Use `sanitize(options, false)` to remove only properties with invalid names without checking their values:

```javascript
WTProperties.sanitize(options, false) ===
  {
    duration: -1000,
    easing: 'not easy',
    iterations: 3,
  }
WTProperties.validate(options) === false
WTProperties.validate(options, false) === true
```

Set the third argument of `validate()` - `returnFirstInvalidProperty` to `true` to return string containing first invalid property instead of boolean when the result is `false`:

This can be useful for writing tests. Here's an [example](https://github.com/webanimate/animate.web/blob/a5efb7c5e70dfc6014bfba6db04a85af3791f87a/test/index.test.js#L107).

```javascript
const options = {
  duration: -1000,
  easing: 'not easy',
  iterations: 3,
  someInvalidOption: 123,
}
WTProperties.validate(options) === false
WTProperties.validate(options, true, true) === 'duration: -1000'
WTProperties.validate(options, false) === false
WTProperties.validate(options, false, true) === 'someInvalidOption: 123'
```

`options` can be array of properties names to check or a string (a single property name). In this case the optional arguments have no effect.

Play with the [DEMO](https://webanimate.github.io/waapi-timing-properties/) for better understanding of how it works.

Here's the list of all the properties with their possible values and defaults:

- #### id

  Possible values:

  - Any string

  Default:

  - No default value

- #### direction

  Possible values:

  - `normal`
  - `reverse`
  - `alternate`
  - `alternate-reverse`

  Default:

  - `normal`

- #### duration

  Possible values:

  - Any positive number or `0`

  Default:

  - `0`

- #### easing

  Possible values:

  - `linear`
  - `ease`
  - `ease-in`
  - `ease-out`
  - `ease-in-out`
  - `cubic-bezier(x1, y1, x2, y2)` where x1 and x2 are numbers between 0 and 1, y1 and y2 are any numbers
  - `step-start`
  - `step-end`
  - `steps(number_of_steps[, direction])` where `number_of_steps` is an integer greater than `0` and optional `direction` is one of `end`, `start`, `jump-both`, `jump-none`, `jump-end`, `jump-start`

  Default:

  - `linear`

- #### endDelay

  Possible values:

  - Any positive number or `0`

  Default:

  - `0`

- #### fill

  Possible values:

  - `none`
  - `forwards`
  - `backwards`
  - `both`
  - `auto`

  Default:

  - `auto`

- #### iterationStart

  Possible values:

  - Any positive number or `0`

  Default:

  - `0`

- #### iterations

  Possible values:

  - Any positive number or `0` or `Infinity`

  Default:

  - `1`

- #### composite

  Possible values:

  - `add`
  - `accumulate`
  - `replace`
  - `auto`

  Default:

  - `replace`

- #### iterationComposite

  Possible values:

  - `accumulate`
  - `replace`

  Default:

  - `replace`

# Development

Build the bundle for browsers into `./dist` folder:

```
yarn build
```

Rebuild the bundle when its source files change on disk:

```shell script
yarn watch
```

Run tests:

```
yarn test
```

Lint:

```shell script
yarn lint
```

Fix linting and style errors:

```shell script
yarn fix
```

Update dependencies:

```shell script
yarn up
```

Generate changelog based on commit messages:

```shell script
yarn c
```

To use the above command [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) must be installed globally. Follow [the recommended workflow](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli#recommended-workflow).
