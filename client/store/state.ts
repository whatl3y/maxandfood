type IState = {
  s3BucketUrl: string
  bodyImages: any[]

  integrations: any
  tags: any[]
  user: any
  account: any
  accountImages: any[]

  homeRecipes: any[]
  allRecipes: any[]
  recipe: any

  snackbar: any
}

const state = (): IState => ({
  s3BucketUrl: 'https://public.maxandfood.com',
  bodyImages: [],

  integrations: null,
  tags: [],
  user: null,
  account: null,
  accountImages: [],

  homeRecipes: [],
  allRecipes: [],
  recipe: null,

  snackbar: {
    color: 'red',
    show: false,
    text: '',
  },
})

export type RootState = ReturnType<typeof state>

export default state
