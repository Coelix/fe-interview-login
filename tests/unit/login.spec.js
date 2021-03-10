import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate)
localVue.use(VueRouter)

const router = new VueRouter()



describe('Login form', () => {
  let store
  let actions
  const loginMock = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    actions = {
      login: loginMock,
      logout: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  test('wrong value for email', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      router
    })

    wrapper.setData({
      email: "tes.com"
    });

    //check vuelidate
    wrapper.vm.$v.$touch()
    expect(wrapper.vm.$v.email.$invalid).toBe(true)
  })

  test('correct value for email', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      router
    })

    wrapper.setData({
      email: "test@email.com"
    });

    //check vuelidate
    wrapper.vm.$v.$touch()
    expect(wrapper.vm.$v.email.$invalid).toBe(false)
  })
  test('wrong value for password', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      router
    })
    wrapper.setData({
      password: "1234"
    });

    //check vuelidate
    wrapper.vm.$v.$touch()
    expect(wrapper.vm.$v.password.$invalid).toBe(true)
  })

  test('correct value for password', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      router
    })
    wrapper.setData({
      password: "32819344"
    });

    //check vuelidate
    wrapper.vm.$v.$touch()
    expect(wrapper.vm.$v.password.$invalid).toBe(false)

  })

  test('submit data to login user', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      router
    })
    const form = wrapper.find('#form')
    const email = wrapper.find('#email')
    email.element.value = 'test@email.com'
    email.trigger("input");
    const password = wrapper.find('#password')
    password.element.value = 'test1234';
    password.trigger("input");
    form.trigger('submit.prevent')
    expect(loginMock).toHaveBeenCalled()

  })
});
