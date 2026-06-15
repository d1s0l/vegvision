const MOCK_ADMIN_REFRESH_TOKEN = "vegvision-admin-refresh";

export function createMockAccessToken() {
  return `vv-admin-access-${Date.now()}`;
}

export function createMockRefreshToken() {
  return MOCK_ADMIN_REFRESH_TOKEN;
}

export function isMockAdminRefreshToken(token: string) {
  return token === MOCK_ADMIN_REFRESH_TOKEN;
}
