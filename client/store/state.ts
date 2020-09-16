type IState = {
  s3BucketUrl: string
  bodyImages: any[]

  integrations: any
  user: any

  homeRecipes: any[]
  allRecipes: any[]
  recipe: any

  snackbar: any
}

const state = (): IState => ({
  s3BucketUrl: 'https://public.maxandfood.com',
  bodyImages: [],

  integrations: null,
  user: null,

  homeRecipes: [],
  allRecipes: [],
  recipe: null,

  snackbar: {
    show: false,
    text: '',
  },
})

export type RootState = ReturnType<typeof state>

export default state
