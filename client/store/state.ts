type IState = {
  s3BucketUrl: string
  bodyImages: any[]

  integrations: any
  user: any

  allRecipes: any[]
  recipe: any
}

const state = (): IState => ({
  s3BucketUrl: 'http://public.maxandfood.com',
  bodyImages: [],

  integrations: null,
  user: null,

  allRecipes: [],
  recipe: null,
})

export type RootState = ReturnType<typeof state>

export default state
