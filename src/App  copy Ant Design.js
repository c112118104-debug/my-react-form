import React, { useState, useEffect, useCallback } from 'react';
import {
  Layout, Menu, Button, Card, Col, Form, Input, Row, Select, Space,
  Table, Typography, message, Modal, Popconfirm, Watermark,
  Statistic, Tag, Avatar, Tooltip, FloatButton, Drawer, Descriptions
} from 'antd';
import {
  SearchOutlined, EditOutlined, DeleteOutlined, DownloadOutlined,
  PlusOutlined, ClearOutlined, DashboardOutlined, TeamOutlined,
  BookOutlined, EyeOutlined, UserAddOutlined, UnorderedListOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const API_BASE_URL = 'http://localhost:3001/api/students';

const App = () => {
  // === 狀態管理 ===
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // 抽屜 (Drawer) 狀態
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // === API 邏輯 ===
  const fetchStudents = useCallback(async (keyword = '') => {
    setLoading(true);
    try {
      const url = keyword ? `${API_BASE_URL}?keyword=${encodeURIComponent(keyword)}` : API_BASE_URL;
      const response = await fetch(url);
      if (!response.ok) throw new Error('伺服器回應錯誤');
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      message.error('讀取資料庫失敗: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (value) => {
    setSearchText(value);
    fetchStudents(value);
  };

  const handleAdd = async (values) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('新增失敗');
      message.success('新增學生資料成功！已同步至 SQLite');
      addForm.resetFields();
      fetchStudents(searchText);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('刪除失敗');
      message.success('已將資料從資料庫中移除');
      setSelectedRowKeys(selectedRowKeys.filter(k => k !== id));
      fetchStudents(searchText);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleBatchDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/batch-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedRowKeys }),
      });
      if (!response.ok) throw new Error('批次刪除失敗');
      message.success(`成功從 SQLite 刪除 ${selectedRowKeys.length} 筆資料`);
      setSelectedRowKeys([]);
      fetchStudents(searchText);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleEditSave = async () => {
    try {
      const values = await editForm.validateFields();
      const response = await fetch(`${API_BASE_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('更新失敗');
      setIsModalVisible(false);
      message.success('修改學生資料成功！');
      fetchStudents(searchText);
    } catch (err) {
      message.error(err.message);
    }
  };

  const exportToCSV = () => {
    if (students.length === 0) {
      message.warning('目前沒有資料可以匯出');
      return;
    }
    const headers = ['姓名,學號,系所,課程,Email'];
    const csvData = students.map(row => `${row.name},${row.student_id},${row.department},${row.course},${row.email}`);
    const csvString = [headers, ...csvData].join('\n');
    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '學生資料表.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // === 介面操作邏輯 ===
  const openEditModal = (record) => {
    setEditingId(record.id);
    editForm.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const openDrawer = (record) => {
    setViewingStudent(record);
    setIsDrawerVisible(true);
  };

  // === 側邊欄選單點擊處理 ===
  const handleMenuClick = ({ key }) => {
    if (key === 'export') {
      exportToCSV();
    } else if (key === 'refresh') {
      fetchStudents(searchText);
      message.success('已為您重新同步最新資料！');
    } else {
      const element = document.getElementById(key);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // === Table 欄位配置 ===
  const columns = [
    {
      title: '頭像',
      key: 'avatar',
      render: (_, record) => (
        <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${record.student_id}`} style={{ backgroundColor: '#1677ff' }} />
      ),
    },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    {
      title: '學號',
      dataIndex: 'student_id',
      key: 'student_id',
      sorter: (a, b) => a.student_id.localeCompare(b.student_id),
    },
    {
      title: '系所',
      dataIndex: 'department',
      key: 'department',
      render: (dept) => {
        let color = 'blue';
        if (dept === '資訊管理系') color = 'green';
        if (dept === '電子商務系') color = 'purple';
        return <Tag color={color}>{dept}</Tag>;
      },
      filters: [
        { text: '智慧商務系', value: '智慧商務系' },
        { text: '資訊管理系', value: '資訊管理系' },
        { text: '電子商務系', value: '電子商務系' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: '課程',
      dataIndex: 'course',
      key: 'course',
      render: text => <Typography.Link>{text}</Typography.Link>
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="查看詳細資料">
            <Button shape="circle" icon={<EyeOutlined />} onClick={() => openDrawer(record)} />
          </Tooltip>
          <Tooltip title="編輯資料">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => openEditModal(record)} />
          </Tooltip>
          <Popconfirm title="確定要刪除嗎？" onConfirm={() => handleDelete(record.id)} okText="確定" cancelText="取消">
            <Tooltip title="刪除">
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      {/* =======================
          左側邊欄 Menu 區塊
          ======================= */}
      <Sider 
        breakpoint="lg" 
        collapsedWidth="0" 
        style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 10 }}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Title level={4} style={{ color: '#fff', margin: 0 }}>NKUST 教務系統</Title>
        </div>
        
        {/* 核心功能的導覽選單 */}
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['dashboardSection']} 
          onClick={handleMenuClick}
        >
          <Menu.Item key="dashboardSection" icon={<DashboardOutlined />}>
            數據統計儀表板
          </Menu.Item>
          <Menu.Item key="addSection" icon={<UserAddOutlined />}>
            新增學生資料
          </Menu.Item>
          <Menu.Item key="listSection" icon={<UnorderedListOutlined />}>
            查詢與資料列表
          </Menu.Item>
          <Menu.Item key="refresh" icon={<ReloadOutlined />}>
            重新整理資料
          </Menu.Item>
          <Menu.Item key="export" icon={<DownloadOutlined />}>
            匯出 CSV 報表
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* 上方標題列 */}
        <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
          <Title level={3} style={{ margin: '14px 0' }}>🎓 React + SQLite 學生資料中心</Title>
        </Header>

        <Content style={{ margin: '24px', overflow: 'initial' }}>
          <Watermark content="NKUST 內部系統" gap={[200, 200]}>
            
            {/* 賦予 id，讓選單可以點擊跳轉到這裡 */}
            <Row gutter={16} style={{ marginBottom: '24px' }} id="dashboardSection">
              <Col span={8}>
                <Card bordered={false} style={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <Statistic title="總學生人數" value={students.length} prefix={<TeamOutlined />} suffix="人" valueStyle={{ color: '#1677ff' }} />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <Statistic title="智慧商務系" value={students.filter(s => s.department === '智慧商務系').length} prefix={<BookOutlined />} suffix="人" valueStyle={{ color: '#3f8600' }} />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <Statistic title="資訊管理系" value={students.filter(s => s.department === '資訊管理系').length} prefix={<BookOutlined />} suffix="人" valueStyle={{ color: '#cf1322' }} />
                </Card>
              </Col>
            </Row>

            <Row gutter={24}>
              {/* 左欄：新增表單。賦予 id，讓選單點擊可以跳轉 */}
              <Col span={8} id="addSection">
                <Card title="➕ 新增學生資料" bordered={false} style={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <Form form={addForm} layout="vertical" onFinish={handleAdd}>
                    <Form.Item label="姓名" name="name" rules={[{ required: true, message: '請輸入姓名' }]}><Input placeholder="例如：王小明" /></Form.Item>
                    <Form.Item label="學號" name="student_id" rules={[{ required: true, message: '請輸入學號' }]}><Input placeholder="例如：S004" /></Form.Item>
                    <Form.Item label="系所" name="department" rules={[{ required: true, message: '請選擇系所' }]}>
                      <Select placeholder="請選擇系所">
                        <Select.Option value="智慧商務系">智慧商務系</Select.Option>
                        <Select.Option value="資訊管理系">資訊管理系</Select.Option>
                        <Select.Option value="電子商務系">電子商務系</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="課程" name="course" rules={[{ required: true, message: '請選擇課程' }]}>
                      <Select placeholder="請選擇課程">
                        <Select.Option value="Ant Design 元件應用">Ant Design 元件應用</Select.Option>
                        <Select.Option value="前端專案實作">前端專案實作</Select.Option>
                        <Select.Option value="React 入門">React 入門</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: '請輸入正確的信箱格式' }]}><Input placeholder="例如：student@example.com" /></Form.Item>
                    <Form.Item>
                      <Space>
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>新增</Button>
                        <Button icon={<ClearOutlined />} onClick={() => addForm.resetFields()}>清空</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              {/* 右欄：資料列表。賦予 id，讓選單點擊可以跳轉 */}
              <Col span={16} id="listSection">
                <Card title="🔍 查詢與資料列表" bordered={false} style={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <Row justify="space-between" style={{ marginBottom: 16 }}>
                    <Col span={12}>
                      <Input.Search 
                        placeholder="請輸入關鍵字進行模糊查詢" 
                        allowClear 
                        enterButton={<Button type="primary" icon={<SearchOutlined />}>查詢</Button>}
                        onSearch={handleSearch}
                        onChange={(e) => { if(!e.target.value) handleSearch(''); }}
                      />
                    </Col>
                    <Col>
                      <Space>
                        {selectedRowKeys.length > 0 && (
                          <Popconfirm title="確定要刪除選取的學生資料嗎？" onConfirm={handleBatchDelete}>
                            <Button type="primary" danger icon={<DeleteOutlined />}>批次刪除 ({selectedRowKeys.length})</Button>
                          </Popconfirm>
                        )}
                        <Button type="default" icon={<DownloadOutlined />} onClick={exportToCSV}>匯出 CSV</Button>
                      </Space>
                    </Col>
                  </Row>

                  <Table
                    loading={loading}
                    rowSelection={{ selectedRowKeys, onChange: (keys) => setSelectedRowKeys(keys) }}
                    columns={columns}
                    dataSource={students}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                  />
                </Card>
              </Col>
            </Row>
          </Watermark>
        </Content>
      </Layout>

      {/* 彈出視窗：修改資料 */}
      <Modal title="📝 修改學生資料" open={isModalVisible} onOk={handleEditSave} onCancel={() => setIsModalVisible(false)} okText="儲存修改" cancelText="取消" destroyOnClose>
        <Form form={editForm} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '請輸入姓名' }]}><Input /></Form.Item>
          <Form.Item label="學號" name="student_id" rules={[{ required: true, message: '請輸入學號' }]}><Input /></Form.Item>
          <Form.Item label="系所" name="department" rules={[{ required: true, message: '請選擇系所' }]}>
            <Select>
              <Select.Option value="智慧商務系">智慧商務系</Select.Option>
              <Select.Option value="資訊管理系">資訊管理系</Select.Option>
              <Select.Option value="電子商務系">電子商務系</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="課程" name="course" rules={[{ required: true, message: '請選擇課程' }]}>
            <Select>
              <Select.Option value="Ant Design 元件應用">Ant Design 元件應用</Select.Option>
              <Select.Option value="前端專案實作">前端專案實作</Select.Option>
              <Select.Option value="React 入門">React 入門</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: '請輸入有效的 Email' }]}><Input /></Form.Item>
        </Form>
      </Modal>

      {/* 側邊抽屜：查看詳細資料 */}
      <Drawer title="學生詳細資料" placement="right" onClose={() => setIsDrawerVisible(false)} open={isDrawerVisible} width={400}>
        {viewingStudent && (
          <div style={{ textAlign: 'center' }}>
            <Avatar size={100} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${viewingStudent.student_id}`} style={{ marginBottom: 24, backgroundColor: '#1677ff' }} />
            <Descriptions title="基本資訊" column={1} bordered>
              <Descriptions.Item label="學號">{viewingStudent.student_id}</Descriptions.Item>
              <Descriptions.Item label="姓名">{viewingStudent.name}</Descriptions.Item>
              <Descriptions.Item label="系所">
                <Tag color={viewingStudent.department === '資訊管理系' ? 'green' : viewingStudent.department === '電子商務系' ? 'purple' : 'blue'}>
                  {viewingStudent.department}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="課程">{viewingStudent.course}</Descriptions.Item>
              <Descriptions.Item label="Email">{viewingStudent.email}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Drawer>

      {/* 懸浮按鈕：回到頂部 */}
      <FloatButton.BackTop />
    </Layout>
  );
};

export default App;