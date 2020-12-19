import {expect, test} from '@oclif/test'

describe('fourteen', () => {
  test
  .stdout()
  .command(['fourteen', 'resources/test-fourteen-a.txt'])
  .it('runs fourteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('208')
  })

  test
  .stdout()
  .command(['fourteen', 'resources/test-fourteen-b.txt'])
  .it('runs fourteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('23963416704')
  })
})
