import {expect, test} from '@oclif/test'

describe('ten', () => {
  test
  .stdout()
  .command(['ten', 'resources/test-ten-a.txt'])
  .it('runs ten a', ctx => {
    expect(ctx.stdout.trim()).to.equal('35')
  })

  test
  .stdout()
  .command(['ten', 'resources/test-ten-b.txt'])
  .it('runs ten b', ctx => {
    expect(ctx.stdout.trim()).to.equal('220')
  })
})
