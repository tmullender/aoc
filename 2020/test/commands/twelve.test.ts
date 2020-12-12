import {expect, test} from '@oclif/test'

describe('twelve', () => {
  test
  .stdout()
  .command(['twelve', 'resources/test-twelve-a.txt'])
  .it('runs twelve', ctx => {
    expect(ctx.stdout.trim()).to.equal('286')
  })
  test
  .stdout()
  .command(['twelve', 'resources/test-twelve-b.txt'])
  .it('runs twelve', ctx => {
    expect(ctx.stdout.trim()).to.equal('0')
  })
})
