import {expect, test} from '@oclif/test'

describe('six', () => {
  test
  .stdout()
  .command(['six', 'resources/test-six-a.txt'])
  .it('runs six', ctx => {
    expect(ctx.stdout.trim()).to.equal('6')
  })
})
