const API_CONFIG = {
  BASE_URL: "http://localhost:5000",
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/register",
    REFRESH_TOKEN: "/api/auth/refresh_token",
    LOGOUT: "/api/auth/logout",

    ITEMS: "/api/items",
    SEARCH: "/api/items/search",

    CATEGORIES: "/api/categories",
    SUPPLIERS: "/api/suppliers",

    CONTACTS: "/api/contacts",
  },
};

export default API_CONFIG;
