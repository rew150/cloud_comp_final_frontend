import ky from 'ky'

export const kyp = ky.create({
  prefixUrl: process.env.REACT_APP_API_HOST
});
