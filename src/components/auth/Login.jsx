import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Space,
  Divider,
  Typography,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  GithubOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import { loginUser, registerUser } from '../../services/securityService';
import securityService from '../../services/securityService';
import Loading from '../Common/Loading';
import './Auth.css';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const [ssoLoading, setSsoLoading] = useState(null);

  // Lấy returnUrl từ query params
  const returnUrl = searchParams.get('returnUrl') || '/';

  // Redirect if already authenticated
  useEffect(() => {
    const token =
      localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token || isAuthenticated) {
      // Nếu có returnUrl, redirect về đó, nếu không thì về home
      navigate(returnUrl !== '/' ? returnUrl : '/');
    }
  }, [isAuthenticated, navigate, returnUrl]);

  const handleSubmit = async values => {
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        // Register
        await registerUser(values.email, values.password, 'user');
        message.success('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsRegister(false);
        form.resetFields();
      } else {
        // Login
        const result = await loginUser(values.email, values.password);

        if (result.requiresMFA) {
          // MFA required - redirect to MFA page
          message.info('Vui lòng nhập mã MFA');
          navigate('/security', {
            state: { requiresMFA: true, email: values.email },
          });
        } else if (result?.token) {
          // Login success
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('token', result.token);

          // Store sessionId if provided
          if (result.sessionId) {
            localStorage.setItem('sessionId', result.sessionId);
          }

          // Update Redux store
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: result.user,
              sessionId: result.sessionId,
              serviceAccount: result.serviceAccount,
            },
          });

          message.success('Đăng nhập thành công!');

          // Redirect về returnUrl nếu có, nếu không thì về home
          const redirectTo =
            returnUrl && returnUrl !== '/login' ? returnUrl : '/';
          navigate(redirectTo);
        }
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
      message.error(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = async provider => {
    setSsoLoading(provider);
    try {
      const authData = await securityService.getSSOAuthUrl(provider);
      if (authData?.authUrl) {
        window.location.href = authData.authUrl;
      } else {
        message.error(`Không thể lấy URL xác thực từ ${provider}`);
        setSsoLoading(null);
      }
    } catch (error) {
      message.error(`Lỗi đăng nhập ${provider}: ${error.message}`);
      setSsoLoading(null);
    }
  };

  const ssoProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: <GoogleOutlined />,
      color: '#4285F4',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <GithubOutlined />,
      color: '#24292e',
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: <WindowsOutlined />,
      color: '#00A1F1',
    },
  ];

  if (loading && !isRegister) {
    return <Loading fullScreen text='Đang đăng nhập...' />;
  }

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        <Card className='auth-card'>
          <div className='auth-header'>
            <Title level={2} className='auth-title'>
              {isRegister ? '📝 Đăng ký' : '🔐 Đăng nhập'}
            </Title>
            <Text type='secondary'>
              {isRegister
                ? 'Tạo tài khoản mới để sử dụng hệ thống'
                : 'Chào mừng trở lại MIA.vn Integration'}
            </Text>
          </div>

          {error && (
            <Alert
              message={error}
              type='error'
              showIcon
              closable
              onClose={() => setError(null)}
              style={{ marginBottom: 24 }}
            />
          )}

          <Form
            form={form}
            name='auth'
            onFinish={handleSubmit}
            autoComplete='off'
            layout='vertical'
            size='large'
          >
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder='your@email.com'
                autoComplete='email'
              />
            </Form.Item>

            <Form.Item
              name='password'
              label='Mật khẩu'
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='••••••••'
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
            </Form.Item>

            {isRegister && (
              <Form.Item
                name='confirmPassword'
                label='Xác nhận mật khẩu'
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Mật khẩu xác nhận không khớp!')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='••••••••'
                  autoComplete='new-password'
                />
              </Form.Item>
            )}

            {!isRegister && (
              <Form.Item>
                <div className='auth-options'>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                  <a href='#forgot' className='auth-link'>
                    Quên mật khẩu?
                  </a>
                </div>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                loading={loading}
                size='large'
              >
                {isRegister ? 'Đăng ký' : 'Đăng nhập'}
              </Button>
            </Form.Item>
          </Form>

          <Divider>Hoặc</Divider>

          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            {ssoProviders.map(provider => (
              <Button
                key={provider.id}
                icon={provider.icon}
                block
                size='large'
                loading={ssoLoading === provider.id}
                onClick={() => handleSSOLogin(provider.id)}
                style={{
                  borderColor: provider.color,
                  color: provider.color,
                }}
              >
                Đăng nhập với {provider.name}
              </Button>
            ))}
          </Space>

          <div className='auth-footer'>
            <Text type='secondary'>
              {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
              <a
                href='#'
                onClick={e => {
                  e.preventDefault();
                  setIsRegister(!isRegister);
                  form.resetFields();
                  setError(null);
                }}
                className='auth-link'
              >
                {isRegister ? 'Đăng nhập' : 'Đăng ký ngay'}
              </a>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
