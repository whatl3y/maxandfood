import Vuex from 'vuex'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Navbar from './Navbar'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {},
})

describe('Navbar', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Navbar, {
      store,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
