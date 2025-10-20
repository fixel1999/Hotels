import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mockeamos axios
jest.mock('axios');
import axios from 'axios';
import Home from '@/app/page';
import { Provider } from '@/components/ui/provider';
import { LoadingProvider } from '@/context/loadingContext';
import { AuthProvider } from '@/context/authContext';
import userEvent from '@testing-library/user-event';
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginPage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render login form', async () => {
    render(
      <Provider>
        <LoadingProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </LoadingProvider>
      </Provider>);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('openLoginDialog'));

    await waitFor(() => {
      expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    });

    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByTestId('login-username')).toBeInTheDocument();
    expect(screen.getByTestId('login-password')).toBeInTheDocument();
  });

  it('should perform login and store token', async () => {
    const fakeToken = 'mocked.jwt.token';
    mockedAxios.post.mockResolvedValueOnce({ data: fakeToken });

    mockedAxios.get.mockResolvedValue({ data: [] });

    render(
      <Provider>
        <LoadingProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </LoadingProvider>
      </Provider>);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('openLoginDialog'));

    await waitFor(() => {
      expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId('login-username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/auth/login',
        expect.objectContaining({ username: 'admin', password: 'password' }),
      );
    });

    expect(localStorage.getItem('token')).toBe(fakeToken);
  });
});
