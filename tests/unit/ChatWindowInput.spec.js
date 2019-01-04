import { shallowMount } from '@vue/test-utils';
import ChatWindowInput from '@/components/ChatWindowInput.vue';

describe('ChatWindowInput.vue', () => {
  it('render fields', () => {
    const wrapper = shallowMount(ChatWindowInput);
    expect(wrapper.find('.AuthorInput').exists()).toBe(true);
    expect(wrapper.find('.BodyInput').exists()).toBe(true);
  });

  it('has no error class by default', () => {
    const wrapper = shallowMount(ChatWindowInput);

    expect(wrapper.find('.ChatWindowInput__Error').exists()).not.toBe(true);
    expect(wrapper.find('.AuthorInput--has-error').exists()).not.toBe(true);
    expect(wrapper.find('.BodyInput--has-error').exists()).not.toBe(true);
  });

  it('adds error classes properly', () => {
    const wrapper = shallowMount(ChatWindowInput);
    wrapper.setData({ isValid: false });

    expect(wrapper.find('.ChatWindowInput__Error').exists()).toBe(true);
    expect(wrapper.find('.AuthorInput--has-error').exists()).toBe(true);
    expect(wrapper.find('.BodyInput--has-error').exists()).toBe(true);
  });

  it('valid message properly', () => {
    const properMessage = {
      body: 'TEstabodos',
      author: 'ayasresa',
    };
    const wrapper = shallowMount(ChatWindowInput);
    wrapper.setData({ message: properMessage });
    expect(wrapper.vm.valid()).toBe(true);
  });

  it('send message', () => {
    const properMessage = {
      body: 'TEsgfdbvcbxc bcx bxc bcx bx',
      author: 'dfsgbvc',
    };
    const wrapper = shallowMount(ChatWindowInput);
    wrapper.setData({
      message: properMessage,
    });
    wrapper.vm.validAndSend();
    expect(wrapper.emitted('input')[0][0]).toEqual(properMessage);
  });
});
