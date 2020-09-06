import User from './User'

test('creates instance of User', async () => {
  const user = await User.create({ email: 'test@maxwithfood.com' })
  expect(user).toBeInstanceOf(User)
})
