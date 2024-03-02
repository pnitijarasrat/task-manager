import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { HomeOutlined, SettingOutlined, PlusOutlined, InboxOutlined, FieldTimeOutlined, BranchesOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useLocation } from "react-router-dom";
import TagsDrawer from "./TagDrawer";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null,
  onClick?: () => void,
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick
  } as MenuItem;
}


const NavMenu: React.FC = () => {
  const [tagsDrawer, setTagsDrawer] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const location = useLocation()

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const items: MenuItem[] = [
    getItem('Home', '/', < HomeOutlined rev="..." />, null, () => { window.location.href = '/' }),
    getItem('Task', '/task', < InboxOutlined rev="..." />, null, () => { window.location.href = '/task' }),
    getItem('Agenda', '/agenda', < FieldTimeOutlined rev="..." />, null, () => { window.location.href = '/agenda' }),
    getItem('Second Brain', '/secondbrain', <BranchesOutlined rev="..." />, null, () => { window.location.href = '/secondbrain' }),
    getItem('Setting', 'setting', < SettingOutlined rev="..." />,
      [
        getItem('Add Tag', 'tag', < PlusOutlined rev="..." />, null, () => setTagsDrawer(true))
      ]
    ),
  ]

  return (
    <>
      <TagsDrawer open={tagsDrawer} onClose={() => setTagsDrawer(false)} />
      <Menu
        style={{ height: '100%' }}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
      />
    </>
  );
};

export default NavMenu

