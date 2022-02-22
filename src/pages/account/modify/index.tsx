import ProForm, { ProFormText } from "@ant-design/pro-form"
import { Row, Col, Space } from 'antd';
import { Card } from "antd"
import { history, useModel } from 'umi';

function ModifyPassword() {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleFinish = async (values: any) => {
    console.log('modify password', values);
    setInitialState((s) => ({ ...s, currentUser: undefined }));
    history.replace({
      pathname: '/user/login',
    });
  };

  return (
    <>
      <Card>
        <ProForm
          onFinish={handleFinish}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          submitter={{
            render: (props, doms) => {
              return (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms}</Space>
                  </Col>
                </Row>
              )
            },
          }}
        >
          <ProFormText.Password
            name="oldPassword"
            label="请输入旧密码"
            width="sm"
            rules={[
              {
                required: true,
                message: '此项不能为空',
                min: 6,
                max: 14,
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            label="请输入新密码"
            width="sm"
            rules={[
              {
                required: true,
                message: '此项不能为空',
              },
              {
                min: 6,
                message: '密码最少6个字符'
              },
              {
                max: 14,
                message: '密码最多14个字符'
              }
            ]}
          />
          <ProFormText.Password
            name="confirm"
            label="确认新密码"
            width="sm"
            rules={[
              {
                required: true,
                message: '此项不能为空',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码输入不一致'));
                },
              }),
            ]}
            dependencies={['password']}
          />
        </ProForm>
      </Card>
    </>
  )
}

export default ModifyPassword