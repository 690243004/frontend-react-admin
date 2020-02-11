import request from '@u/request'

export const queryListData = (data) => {
  return {
    data: {
      list: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      total:10
    },
    code: 0
  }
  return request({
    method: 'post',
    url: 'api/xxx',
    data
  })
}