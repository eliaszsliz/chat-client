import { mount } from '@vue/test-utils';
import ChatWindowMessage from '@/components/ChatWindowMessage.vue';

describe('ChatWindowMessage.vue', () => {
  it('renders message with proper text, time and author', () => {
    const msg = {
      body: 'Message body',
      author: 'Authorsadsa',
      origin: 'OTHER',
      date: new Date(2014, 2, 11, 2, 5),
    };

    const wrapper = mount(ChatWindowMessage, {
      propsData: { ...msg },
    });

    expect(wrapper.text()).toContain(msg.body);
    expect(wrapper.text()).toContain(msg.author);
  });

  it('renders time properly', () => {
    const msg = {
      body: 'Message body',
      author: 'Authorsadsa',
      origin: 'OTHER',
      date: new Date(2014, 2, 11, 2, 5),
    };

    const wrapper = mount(ChatWindowMessage, {
      propsData: { ...msg },
    });

    const properTime = '02:05';
    expect(wrapper.text()).toContain(properTime);
  });

  it('gives proper class to component', () => {
    const msg = {
      body: 'Message body',
      author: 'ERROR',
      origin: 'ERROR',
      date: new Date(Date.now()),
    };
    const wrapper = mount(ChatWindowMessage, { propsData: { ...msg } });
    expect(wrapper.find('.Message__Content').classes('Message__Content--from-error')).toBe(true);
  });
});
