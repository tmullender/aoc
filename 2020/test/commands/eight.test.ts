import {expect, test} from '@oclif/test'

describe('eight', () => {
  test
  .stdout()
  .command(['eight', 'resources/test-eight-a.txt'])
  .it('runs eight a', ctx => {
    expect(ctx.stdout.trim()).to.equal('5')
  })
})
