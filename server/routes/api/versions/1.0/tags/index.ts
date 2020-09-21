import { Tag } from '../../../../../models'

export default {
  async save({ req, res }) {
    const tag = req.body

    // TODO: check admin info of user to create/save tag

    let tagInst: typeof Tag
    if (tag.id) {
      tagInst = await Tag.findOne({ where: { id: tag.id } })
      if (!tagInst) throw new Error(`No tag found with the ID provded.`)
    } else {
      tagInst = Tag.build(tag)
    }

    Object.keys(tag).forEach((key) => (tagInst[key] = tag[key]))
    await tagInst.save()

    res.json({ id: tagInst.id })
  },
}
