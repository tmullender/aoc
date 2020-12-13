import {expect, test} from '@oclif/test'

describe('thirteen', () => {
  test
  .stdout()
  .command(['thirteen', 'resources/test-thirteen-a.txt'])
  .it('runs thirteen a', ctx => {
    expect(ctx.stdout.trim()).to.equal('1068781')
  })

  test
  .stdout()
  .command(['thirteen', 'resources/test-thirteen-b.txt'])
  .it('runs thirteen b', ctx => {
    expect(ctx.stdout.trim()).to.equal('3417')
  })

  test
  .stdout()
  .command(['thirteen', 'resources/test-thirteen-c.txt'])
  .it('runs thirteen c', ctx => {
    expect(ctx.stdout.trim()).to.equal('754018')
  })

  test
  .stdout()
  .command(['thirteen', 'resources/test-thirteen-d.txt'])
  .it('runs thirteen d', ctx => {
    expect(ctx.stdout.trim()).to.equal('779210')
  })

  test
  .stdout()
  .command(['thirteen', 'resources/test-thirteen-e.txt'])
  .it('runs thirteen e', ctx => {
    expect(ctx.stdout.trim()).to.equal('1261476')
  })

  test
  .stdout()
  .command(['thirteen', 'resources/test-thirteen-f.txt'])
  .it('runs thirteen f', ctx => {
    expect(ctx.stdout.trim()).to.equal('1202161486')
  })
})
