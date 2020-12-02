import {expect, test} from '@oclif/test'

describe('two', () => {
  test
  .stdout()
  .command(['two', 'resources/test-two-a.txt'])
  .it('runs two', ctx => {
    expect(ctx.stdout.trim()).to.equal('1')
  })
})
