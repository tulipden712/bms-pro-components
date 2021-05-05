import React from 'react';
import { Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';

const dataSource = [
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
];

export default () => (
  <ProList<typeof dataSource[number]>
    rowKey="id"
    headerTitle="基础列表"
    dataSource={dataSource}
    showActions="hover"
    editable={{
      onChange: (e) => console.log(e),
    }}
    metas={{
      title: {
        dataIndex: 'name',
      },
      avatar: {
        dataIndex: 'image',
      },
      description: {
        dataIndex: 'desc',
      },
      subTitle: {
        render: () => {
          return (
            <Space size={0}>
              <Tag color="blue">Ant Design</Tag>
              <Tag color="#5BD8A6">TechUI</Tag>
            </Space>
          );
        },
      },
      actions: {
        render: (text, row, index, action) => [
          <a
            onClick={() => {
              action?.startEditable(row.id);
            }}
            key="link"
          >
            编辑
          </a>,
        ],
      },
    }}
  />
);
