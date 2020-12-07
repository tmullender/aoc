import {expect, test} from '@oclif/test'

describe('seven', () => {
  test
  .stdout()
  .command(['seven', 'resources/test-seven-a.txt'])
  .it('runs seven a', ctx => {
    expect(ctx.stdout.trim()).to.equal('32')
  })

  test
  .stdout()
  .command(['seven', 'resources/test-seven-b.txt'])
  .it('runs seven b', ctx => {
    expect(ctx.stdout.trim()).to.equal('126')
  })
})
