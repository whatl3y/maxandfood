type IState = {
  user: any
}

const state = (): IState => ({
  user: null,
})

export type RootState = ReturnType<typeof state>

export default state
