import { terser } from 'rollup-plugin-terser'
import * as pkg from './package.json'

const name = 'WTOptions'

export default {
  input: pkg.main,
  output: {
    file: 'dist/' + name.toLowerCase() + '.js',
    format: 'umd',
    name: name,
    sourcemap: true
  },
  plugins: [
    terser({
      output: {
        preamble: `//${pkg.name} v${pkg.version} ${pkg.homepage}`
      }
    })
  ]
}
