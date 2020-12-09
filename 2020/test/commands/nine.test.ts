import {expect, test} from '@oclif/test'

describe('nine', () => {
  test
  .stdout()
  .command(['nine', 'resources/test-nine-a.txt'])
  .it('runs nine a', ctx => {
    expect(ctx.stdout.trim()).to.equal('127')
  })
})
