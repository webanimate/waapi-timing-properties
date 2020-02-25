# waapi-timing-properties

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/waapi-timing-properties.svg)](https://www.npmjs.com/package/waapi-timing-properties)
[![](https://img.shields.io/bundlephobia/minzip/waapi-timing-properties.svg)](https://bundlephobia.com/result?p=waapi-timing-properties)

This is alpha. Please don't use it. Stable version coming very soon.

List of [Element.animate()](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) options and their possible values.

List of timing properties and their possible values for animation effects used in [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

It can be used to validate and sanitize options passed to [Element.animate()](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [KeyframeEffectReadOnly()](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffectReadOnly/KeyframeEffectReadOnly) and [KeyframeEffect()](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect).

Main article: https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming

https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect

https://developer.mozilla.org/en-US/docs/Web/API/Element/animate

## Install

```
$ yarn add waapi-timing-properties
```

or

```
$ npm install waapi-timing-properties
```

## Usage

Import:

```javascript
import animateOptions from 'waapi-timing-properties'
```

Or load from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/waapi-timing-properties@latest/dist/animateoptions.js"></script>
```

Validate options:

```javascript
let options = {
  duration: 1000,
  iterations: 2,
  direction: 'alternate',
  easing: 'easy',
  play: true
}
```

# Development

Build the bundle for browsers into `./dist` folder:

```
yarn build
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
