import {expect, test} from '@oclif/test'

describe('ten', () => {
  test
  .stdout()
  .command(['ten', 'resources/test-ten-a.txt'])
  .it('runs ten a', ctx => {
    expect(ctx.stdout.trim()).to.equal('8')
  })

  test
  .stdout()
  .command(['ten', 'resources/test-ten-b.txt'])
  .it('runs ten b', ctx => {
    expect(ctx.stdout.trim()).to.equal('19208')
  })

  test
  .stdout()
  .command(['ten', 'resources/test-ten-c.txt'])
  .it('runs ten b', ctx => {
    expect(ctx.stdout.trim()).to.equal('32')
  })
})
