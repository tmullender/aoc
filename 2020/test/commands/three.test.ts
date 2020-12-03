import {expect, test} from '@oclif/test'

describe('three', () => {
  test
  .stdout()
  .command(['three', 'resources/test-three-a.txt'])
  .it('runs three', ctx => {
    expect(ctx.stdout.trim()).to.equal('7')
  })
})
