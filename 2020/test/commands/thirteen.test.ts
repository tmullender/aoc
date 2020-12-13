import {expect, test} from '@oclif/test'

describe('thirteen', () => {
  test
  .stdout()
  .command(['thirteen', 'resources/test-thirteen-a.txt'])
  .it('runs thirteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('295')
  })
})
