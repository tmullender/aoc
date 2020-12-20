import {expect, test} from '@oclif/test'

describe('sixteen', () => {
  test
  .stdout()
  .command(['sixteen', 'resources/test-sixteen-a.txt'])
  .it('runs sixteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('71')
  })
})
