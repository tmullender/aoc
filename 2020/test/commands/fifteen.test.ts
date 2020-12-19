import {expect, test} from '@oclif/test'

describe('fifteen', () => {
  test
  .stdout()
  .command(['fifteen', 'resources/test-fifteen-a.txt'])
  .it('runs fifteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('436')
  })

  test
  .stdout()
  .command(['fifteen', 'resources/test-fifteen-b.txt'])
  .it('runs fifteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('1')
  })

  test
  .stdout()
  .command(['fifteen', 'resources/test-fifteen-c.txt'])
  .it('runs fifteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('10')
  })

  test
  .stdout()
  .command(['fifteen', 'resources/test-fifteen-d.txt'])
  .it('runs fifteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('27')
  })

  test
  .stdout()
  .command(['fifteen', 'resources/test-fifteen-e.txt'])
  .it('runs fifteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('78')
  })

  test
  .stdout()
  .command(['fifteen', 'resources/test-fifteen-f.txt'])
  .it('runs fifteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('438')
  })

  test
  .stdout()
  .command(['fifteen', 'resources/test-fifteen-g.txt'])
  .it('runs fifteen', ctx => {
    expect(ctx.stdout.trim()).to.equal('1836')
  })
})
