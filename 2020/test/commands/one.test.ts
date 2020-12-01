import {expect, test} from '@oclif/test'

describe('one', () => {
  test
  .stdout()
  .command(['one', 'resources/test-one-a.txt'])
  .it('runs one', ctx => {
    expect(ctx.stdout.trim()).to.equal('514579')
  })
})
