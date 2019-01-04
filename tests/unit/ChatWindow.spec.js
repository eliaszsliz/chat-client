import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ChatWindow from '@/components/ChatWindow.vue';
import Vuex from 'vuex';
import Vue from 'vue';
import store from '../../src/store';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ChatWindow.vue', () => {
  beforeEach(() => {
    store.replaceState({
      messages: [],
    });
  });

  // it('send proper message', () => {
  //   const message = {
  //     body: 'gfsadf sadfsadfsdfsd fds fds fd',
  //     author: 'sa gdb',
  //   };

  //   const wrapper = shallowMount(ChatWindow, {
  //     store,
  //     localVue,
  //   });
  //   wrapper.vm.socket.send = (val) => {
  //     expect(val).toBe(JSON.stringify(message));
  //   };

  //   wrapper.vm.send(message);
  // });

  it('recive and add proper message', () => {
    const message = {
      body: 'Wrasr sare vgds safd.',
      author: 'bbbbvvx',
      date: Date.now(),
    };

    const wrapper = shallowMount(ChatWindow, {
      store,
      localVue,
    });
    wrapper.vm.$refs.messagesWrapper.scrollTo = jest.fn();

    wrapper.vm.socket.onmessage({ data: JSON.stringify(message) });
    expect(wrapper.vm.messages.length).toBe(1);
  });
});
