import ky from 'ky'

const kypt = ky.create({
  prefixUrl: process.env.REACT_APP_API_HOST,
  cache: 'no-cache',
});

let kype;
if (process.env.NODE_ENV === 'development') {
  kype = kypt.extend({ credentials: 'include' })
} else {
  kype = kypt
}

export const kyp = kype
