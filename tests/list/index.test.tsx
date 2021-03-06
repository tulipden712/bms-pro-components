import { mount } from 'enzyme';
import type { ReactText } from 'react';
import React, { useState } from 'react';
import ProList from '@ant-design/pro-list';
import { act } from 'react-dom/test-utils';
import PaginationDemo from '../../packages/list/src/demos/pagination';
import { waitForComponentToPaint } from '../util';
import { Tag } from 'antd';

type DataSourceType = {
  name: string;
  desc: {
    text: string;
  };
};

describe('List', () => {
  it('ð base use', async () => {
    const html = mount(
      <ProList
        dataSource={[
          {
            name: 'ææ¯åç§°',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
      />,
    );
    expect(html.find('.ant-pro-list-row-title').text()).toEqual('ææ¯åç§°');
    expect(html.find('.ant-pro-list-row-description').text()).toEqual('desc text');
  });

  it('ð only has content', async () => {
    const html = mount(
      <ProList
        dataSource={[
          {
            name: 'ææ¯åç§°',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          content: {
            render: () => {
              return (
                <div>
                  æ®µè½ç¤ºæï¼èèéæè®¾è®¡å¹³å°
                  design.alipay.comï¼ç¨æå°çå·¥ä½éï¼æ ç¼æ¥å¥èèéæçæï¼æä¾è·¨è¶è®¾è®¡ä¸å¼åçä½éªè§£å³æ¹æ¡ãèèéæè®¾è®¡å¹³å°
                  design.alipay.comï¼ç¨æå°çå·¥ä½éï¼æ ç¼æ¥å¥èèéæçææä¾è·¨è¶è®¾è®¡ä¸å¼åçä½éªè§£å³æ¹æ¡ã
                </div>
              );
            },
          },
        }}
      />,
    );
    expect(html.render()).toMatchSnapshot();
  });

  it('ð only has description', async () => {
    const html = mount(
      <ProList
        dataSource={[
          {
            name: 'ææ¯åç§°',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          description: {
            render: () => (
              <>
                <Tag>è¯­éä¸æ </Tag>
                <Tag>è®¾è®¡è¯­è¨</Tag>
                <Tag>èèéæ</Tag>
              </>
            ),
          },
        }}
      />,
    );
    expect(html.render()).toMatchSnapshot();
  });

  it('ð empty', async () => {
    const html = mount(
      <ProList
        metas={{
          title: {
            dataIndex: 'name',
          },
        }}
      />,
    );
    expect(html.find('.ant-empty-description').text()).toEqual('ææ æ°æ®');
  });

  it('ð expandable', async () => {
    const onExpand = jest.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly ReactText[]>([]);
      return (
        <ProList
          dataSource={[
            {
              name: 'ææ¯åç§°',
              content: <div>ææ¯åå®¹</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{ expandedRowKeys, onExpandedRowsChange, onExpand }}
        />
      );
    };
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-description').length).toEqual(0);
    html.find('.ant-pro-list-row-expand-icon').simulate('click');
    expect(html.find('.ant-pro-list-row-content').text()).toEqual('ææ¯åå®¹');
    expect(onExpand).toHaveBeenCalledWith(true, expect.objectContaining({ name: 'ææ¯åç§°' }));
  });

  it('ð expandable support expandRowByClick', async () => {
    const onExpand = jest.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly ReactText[]>([]);
      return (
        <ProList
          dataSource={[
            {
              name: 'ææ¯åç§°',
              content: <div>ææ¯åå®¹</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{ expandedRowKeys, onExpandedRowsChange, onExpand, expandRowByClick: true }}
        />
      );
    };
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-description').length).toEqual(0);
    html.find('.ant-list-item').simulate('click');
    expect(html.find('.ant-pro-list-row-content').text()).toEqual('ææ¯åå®¹');
    expect(onExpand).toHaveBeenCalledWith(true, expect.objectContaining({ name: 'ææ¯åç§°' }));
  });

  it('ð expandable with defaultExpandedRowKeys', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: 'ææ¯åç§°',
              content: <div>ææ¯åå®¹</div>,
              itemKey: 'a',
            },
            {
              name: 'ææ¯åç§°',
              content: <div>ææ¯åå®¹b</div>,
              itemKey: 'b',
            },
          ]}
          rowKey="itemKey"
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{
            defaultExpandedRowKeys: ['b'],
          }}
        />
      );
    };
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-content').text()).toEqual('ææ¯åå®¹b');
  });

  it('ð expandable with expandedRowRender', async () => {
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly ReactText[]>([]);
      return (
        <ProList
          dataSource={[
            {
              name: 'ææ¯åç§°',
              content: <div>ææ¯åå®¹</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{
            expandedRowKeys,
            onExpandedRowsChange,
            expandedRowClassName: () => {
              return 'test-custom-class-name';
            },
            expandedRowRender: (record, index) => {
              return <div>expand:{index}</div>;
            },
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-description').length).toEqual(0);
    html.find('.ant-pro-list-row-expand-icon').simulate('click');
    expect(html.find('.ant-pro-list-row-content .test-custom-class-name').text()).toEqual(
      'expand:0',
    );
  });

  it('ð expandable with expandIcon', async () => {
    const fn = jest.fn();
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: 'ææ¯åç§°',
              content: <div>ææ¯åå®¹</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{
            expandIcon: ({ record }) => (
              <div id="test_click" onClick={() => fn(record.name)} className="expand-icon" />
            ),
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    const html = mount(<Wrapper />);

    await waitForComponentToPaint(html, 1200);

    expect(html.find('.expand-icon')).toHaveLength(1);

    act(() => {
      html.find('#test_click').simulate('click');
    });

    expect(fn).toBeCalledWith('ææ¯åç§°');
  });

  it('ð ProList support renderItem', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: 'ææ¯åç§°',
              content: <div>ææ¯åå®¹</div>,
            },
          ]}
          renderItem={(_, index) => {
            return <div id="test_index">{index}</div>;
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    const html = mount(<Wrapper />);

    expect(html.find('#test_index').exists()).toBeTruthy();
  });

  it('ð rowSelection', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: 'ææ¯åç§°',
              description: 'ææ¯æè¿°',
            },
            {
              name: 'ææ¯åç§°',
              description: 'ææ¯æè¿°',
            },
          ]}
          rowSelection={{}}
          metas={{
            title: {
              dataIndex: 'name',
            },
            description: {},
          }}
        />
      );
    };
    const html = mount(<Wrapper />);
    expect(html.find('.ant-checkbox-input').length).toEqual(2);
    html
      .find('.ant-checkbox-input')
      .at(0)
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    await waitForComponentToPaint(html, 1000);
    expect(html.find('.ant-checkbox-input').at(0).prop('checked')).toEqual(true);
    expect(html.find('.ant-checkbox-input').at(1).prop('checked')).toEqual(false);
  });

  it('ð support pagination', async () => {
    const html = mount(<PaginationDemo />);
    expect(html.find('.ant-list-item').length).toEqual(5);
    act(() => {
      html.find('.ant-pagination-item').at(1).simulate('click');
    });
    await waitForComponentToPaint(html, 200);
    expect(html.find('.ant-list-item').length).toEqual(2);

    act(() => {
      html.find('.ant-select-selector').simulate('mousedown');
    });

    await waitForComponentToPaint(html, 20);

    act(() => {
      html.find('.ant-select-item-option').at(3).simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(html.find('.ant-list-item').length).toEqual(7);
  });

  it('ð filter and request', async () => {
    const onRequest = jest.fn();
    const html = mount(
      <ProList<any, { title: string }>
        metas={{
          title: {
            title: 'æ é¢',
          },
        }}
        request={(params, sort, filter) => {
          if (params.title) {
            onRequest(params, sort, filter);
          }
          return Promise.resolve({
            success: true,
            data: [
              {
                title: 'æµè¯æ é¢1',
              },
              {
                title: 'æµè¯æ é¢2',
              },
            ],
          });
        }}
        pagination={{
          pageSize: 5,
          onShowSizeChange: () => {},
        }}
        search={{
          filterType: 'light',
        }}
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.ant-pro-list-row-title').length).toEqual(2);
    act(() => {
      html.find('.ant-pro-core-field-label').simulate('click');
    });

    await waitForComponentToPaint(html, 200);
    act(() => {
      html.find('.ant-input').simulate('change', {
        target: {
          value: 'test',
        },
      });
    });

    await waitForComponentToPaint(html, 200);
    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);
    expect(onRequest).toHaveBeenCalledWith(
      {
        current: 1,
        pageSize: 5,
        title: 'test',
      },
      {},
      {},
    );
  });

  it('ð ProList support onRow', async () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const html = mount(
      <ProList<DataSourceType>
        dataSource={[
          {
            name: 'ææ¯åç§°',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
        onRow={(record: DataSourceType) => {
          return {
            onMouseEnter: () => {
              onMouseEnter(record.name);
            },
            onClick: () => {
              onClick();
            },
          };
        }}
      />,
    );

    act(() => {
      expect(html.find('.ant-list-item').simulate('click'));
      html.update();
    });

    await waitForComponentToPaint(html);

    act(() => {
      expect(html.find('.ant-list-item').simulate('mouseenter'));
      html.update();
    });

    await waitForComponentToPaint(html);

    expect(onClick).toBeCalled();
    expect(onMouseEnter).toBeCalledWith('ææ¯åç§°');
  });
});
