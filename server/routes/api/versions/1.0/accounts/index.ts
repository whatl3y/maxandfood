import { Account, AccountImage, User } from '../../../../../models'

export default {
  async me({ req, res }) {
    const { account } = await User.getCurrentUserAndAccount(req.user.id)
    const images = await AccountImage.findAll({
      where: {
        accountId: account.id,
      },
    })
    res.json({ account, images })
  },

  async save({ req, res }) {
    const { account, images } = req.body
    const {
      account: { id },
    } = await User.getCurrentUserAndAccount(req.user.id)

    const accountInst = await Account.findOne({ where: { id } })
    Object.keys(account).forEach((key) => (accountInst[key] = account[key]))
    await accountInst.save()

    await Promise.all(
      images.map(async (img) => {
        let imgInst: typeof AccountImage
        if (img.id) {
          imgInst = await AccountImage.findOne({ where: { id: img.id } })
        } else {
          imgInst = AccountImage.build(img)
        }

        Object.keys(img).forEach((key) => (imgInst[key] = img[key]))
        await imgInst.save()
      })
    )

    res.json(true)
  },
}
