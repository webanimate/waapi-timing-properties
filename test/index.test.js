import * as WTProperties from '../src/index'

const testData = {
  validate: [
    {
      args: [],
      data: {
        String: [
          {
            test: 'iterationComposite',
            expect: true,
          },
          {
            test: '123',
            expect: false,
          },
        ],
        Array: [
          {
            test: ['iterationComposite', 'delay'],
            expect: true,
          },
          {
            test: ['iterationCompoite', 'delay'],
            expect: false,
          },
        ],
        Object: [
          {
            test: {
              iterationComposite: 'accumulate',
            },
            expect: true,
          },
          {
            test: {
              iterationComposite: '1',
            },
            expect: false,
          },
          {
            test: {
              iterationCompoite: 'accumulate',
            },
            expect: false,
          },
          {
            test: {
              iterationComposite: false,
            },
            expect: false,
          },
          {
            test: {
              delay: -100,
            },
            expect: false,
          },
          {
            test: {
              delay: 100,
            },
            expect: true,
          },
          {
            test: {
              delay: 1e500,
            },
            expect: false,
          },
          {
            test: {
              easing: 'cubic-bezier()',
            },
            expect: true,
          },
          {
            test: {
              id: 'cubic-bezier()',
            },
            expect: true,
          },
        ],
      },
    },
    {
      args: [false],
      data: {
        Object: [
          {
            test: {
              iterationComposite: '1',
            },
            expect: true,
          },
        ],
      },
    },
    {
      args: [true, true],
      data: {
        Array: [
          {
            test: ['iterationComposite', 'dlay'],
            expect: 'dlay',
          },
        ],
        Object: [
          {
            test: {
              iteraionComposite: 'accumulate',
            },
            expect: 'iteraionComposite: accumulate',
          },
          {
            test: {
              iterationComposite: '1',
            },
            expect: 'iterationComposite: 1',
          },
          {
            test: {},
            expect: false,
          },
        ],
      },
    },
  ],

  sanitize: [
    {
      args: [],
      data: {
        String: [
          {
            test: 'endDelay',
            expect: 'endDelay',
          },
          {
            test: 'del',
            expect: '',
          },
        ],
        Array: [
          {
            test: ['direction', 'easing', 'dll'],
            expect: ['direction', 'easing'],
          },
        ],
        Object: [
          {
            test: {
              iterationComposite: 'accumulate',
              del: 'accumulate',
            },
            expect: {
              iterationComposite: 'accumulate',
            },
          },
          {
            test: {
              iterationComposite: 'accumuslate',
            },
            expect: {
              iterationComposite: 'replace',
            },
          },
          {
            test: {},
            expect: {},
          },
        ],
      },
    },
    {
      args: [false],
      data: {
        Object: [
          {
            test: {
              iterationComposite: 'accumulate',
            },
            expect: {
              iterationComposite: 'accumulate',
            },
          },
        ],
      },
    },
    {
      args: [true, false],
      data: {
        Object: [
          {
            test: {
              iterationComposite: 'accumulte',
            },
            expect: {},
          },
        ],
      },
    },
  ],
}

const testFn = (key) => {
  describe(`\n\n******************************\n${key}()\n******************************\n`, () => {
    testData[key].forEach((kk) => {
      describe(`${key}(obj${kk.args.length ? ', ' + kk.args.join(', ') : ''})`, () => {
        Object.keys(kk.data).forEach((kkk) => {
          describe(`${key}(${kkk}${kk.args.length ? ', ' + kk.args.join(', ') : ''})`, () => {
            kk.data[kkk].forEach((ke) => {
              test(`${key}(${JSON.stringify(ke.test)}) to equal ${JSON.stringify(ke.expect)}`, () => {
                expect(WTProperties[key](ke.test, ...kk.args)).toEqual(ke.expect)
              })
            })
          })
        })
      })
    })
  })
}

Object.keys(testData).forEach(function (key) {
  testFn(key)
})
