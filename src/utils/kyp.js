import ky from 'ky'

const kypt = ky.create({
  prefixUrl: process.env.REACT_APP_API_HOST,
  cache: 'no-cache',
  hooks: {
    beforeRequest: [
      request => {
        request.headers.delete('If-None-Match');
      }
    ]
  }
});

let kype;
if (process.env.NODE_ENV === 'development') {
  kype = kypt.extend({ credentials: 'include' })
} else {
  kype = kypt
}

export const kyp = kype
