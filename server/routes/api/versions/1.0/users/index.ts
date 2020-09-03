import User from '../../../../../models/User'

export default {
  async me({ req, res, redis }) {
    const user = await User.findOne({ where: { id: req.user.id } })
    res.json({ user })
  },
}
