export const queryListData = (data) => {
  return {
    data: {
      list: [
        {},
        {},
        {}
      ],
      total:3
    },
    code: 0
  }
  return request({
    method: 'post',
    url: 'api/xxx',
    data
  })
}