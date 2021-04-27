import ky from 'ky'

export const kyp = ky.create({
  prefixUrl: process.env.REACT_APP_API_HOST,
  cache: 'no-cache',
  hooks: {
    beforeRequest: [
      request => {
        request.headers.delete('If-None-Match');
      }
    ]
  },
  credentials: 'include'
});
