import { Menu, Dropdown, Space } from 'antd';

export default function ActionDropdown ({ handleClick }) {
    const handleButtonClick = (e) => {
        handleClick('editJob')
    }
    const handleMenuClick = (e) => {
        handleClick(e.key);
    }
    const menu = (
      <Menu
        onClick={handleMenuClick}
      >
          <Menu.Item key="reviews">
                Reviews
            </Menu.Item>
            <Menu.Item key="comments">
                Comments
            </Menu.Item>
            <Menu.Item key="invoices">
                Invoices
            </Menu.Item>
      </Menu>
    );
    return <Space wrap>
    <Dropdown.Button type='primary' onClick={handleButtonClick} overlay={menu}>
      Edit
    </Dropdown.Button>
  </Space>
}