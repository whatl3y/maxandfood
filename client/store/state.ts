type IState = {
  bodyImages: any[]
  integrations: any
  user: any
}

const state = (): IState => ({
  bodyImages: [],

  integrations: null,
  user: null,
})

export type RootState = ReturnType<typeof state>

export default state
