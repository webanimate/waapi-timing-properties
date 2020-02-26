import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import * as pkg from './package.json'

const name = 'WTProperties'

export default {
  input: pkg.main,
  output: {
    file: 'dist/' + name.toLowerCase() + '.js',
    format: 'umd',
    name: name,
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({
      output: {
        preamble: `//${pkg.name} v${pkg.version} ${pkg.homepage}`
      }
    })
  ]
}
