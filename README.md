# WAAPI timing properties

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/waapi-timing-properties.svg)](https://www.npmjs.com/package/waapi-timing-properties)
[![](https://img.shields.io/bundlephobia/minzip/waapi-timing-properties.svg)](https://bundlephobia.com/result?p=waapi-timing-properties)

This is alpha. Please don't use it. Stable version coming very soon.

[DEMO](https://webanimate.github.io/waapi-timing-properties/) and its [source code](https://github.com/webanimate/waapi-timing-properties/blob/master/index.html).

List of [timing properties](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) and their possible values for animation effects used in [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

It can be used to validate and sanitize options passed to [Element.animate()](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [KeyframeEffectReadOnly()](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffectReadOnly/KeyframeEffectReadOnly) and [KeyframeEffect()](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect).

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
  someInvalidOption: 123
}
```

Use `WTProperties.sanitize(options)` to remove properties with invalid names and replace properties with valid names but invalid values with their default values:

```javascript
WTProperties.sanitize(options) ===
  {
    duration: 0,
    easing: 'linear',
    iterations: 3
  }
WTProperties.validate(options) === true
```

Use `sanitize(options, true, false)` to remove all properties with invalid names and/or values:

```javascript
WTProperties.sanitize(options, true, false) ===
  {
    iterations: 3
  }
WTProperties.validate(options) === true
```

Use `sanitize(options, false)` to remove only properties with invalid names without checking their values:

```javascript
WTProperties.sanitize(options, false) ===
  {
    duration: -1000,
    easing: 'not easy',
    iterations: 3
  }
WTProperties.validate(options) === false
WTProperties.validate(options, false) === true
```

Set the third argument of `validate()` - `returnFirstInvalidProperty` to `true` to return string containing first invalid property instead of boolean when the result is `false`:

```javascript
const options = {
  duration: -1000,
  easing: 'not easy',
  iterations: 3,
  someInvalidOption: 123
}
WTProperties.validate(options) === false
WTProperties.validate(options, true, true) === 'duration: -1000'
WTProperties.validate(options, false) === false
WTProperties.validate(options, false, true) === 'someInvalidOption: 123'
```

`options` can be array of properties names to check or a string (a single property name). In this case the optional arguments have no effect.

Play with the [DEMO](https://webanimate.github.io/waapi-timing-properties/) for better understanding of how it works.

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
