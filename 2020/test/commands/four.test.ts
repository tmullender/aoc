import {expect, test} from '@oclif/test'

describe('four', () => {
  test
  .stdout()
  .command(['four', 'resources/test-four-a.txt'])
  .it('runs four', ctx => {
    expect(ctx.stdout.trim()).to.equal('4')
  })
})
