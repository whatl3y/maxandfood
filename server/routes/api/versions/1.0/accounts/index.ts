import Account from '../../../../../models/Account'
import AccountImage from '../../../../../models/AccountImage'

export default {
  // async images({ req, res, redis }) {
  //   const images = await AccountImage.findAll({
  //     where: { isEnabled: true },
  //     include: [
  //       {
  //         model: Account,
  //         where: { domainName: req.get('host') },
  //       },
  //     ],
  //   })
  //   res.json({ images })
  // },
}
