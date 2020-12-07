import {expect, test} from '@oclif/test'

describe('seven', () => {
  test
  .stdout()
  .command(['seven', 'resources/test-seven-a.txt'])
  .it('runs seven', ctx => {
    expect(ctx.stdout.trim()).to.equal('4')
  })
})
