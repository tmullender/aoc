import {expect, test} from '@oclif/test'

describe('eleven', () => {
  test
  .stdout()
  .command(['eleven', 'resources/test-eleven-a.txt'])
  .it('runs eleven', ctx => {
    expect(ctx.stdout.trim()).to.equal('26')
  })
})
