import { render, mount } from 'enzyme';
import React from 'react';

import ProSkeleton from '../../packages/skeleton/src/index';

describe('skeleton', () => {
  it('🥩 list base use', async () => {
    const html = render(<ProSkeleton type="list" />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 descriptions base use', async () => {
    const html = render(<ProSkeleton type="descriptions" />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 result base use', async () => {
    const html = render(<ProSkeleton type="result" />);
    expect(html).toMatchSnapshot();
  });

  it('🥩 descriptions api use', async () => {
    const wrapper = mount(<ProSkeleton type="descriptions" pageHeader={false} list={10} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({
      table: false,
    });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🥩 list api use', async () => {
    const wrapper = mount(
      <ProSkeleton
        type="list"
        pageHeader={false}
        statistic={3}
        actionButton={false}
        toolbar={false}
        list={10}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({
      list: false,
      statistic: false,
    });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('🥩 statistic=1,span=16', async () => {
    const wrapper = mount(
      <ProSkeleton
        type="list"
        pageHeader={false}
        statistic={1}
        actionButton={false}
        toolbar={false}
        list={10}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
