// import Vue from 'vue'
import dayjs from 'dayjs'

export default (_, inject) => {
  const formats = {
    date: 'MM/DD/YYYY',
    dateTime: 'MM/DD/YYYY h:mma'
  }

  inject('dayjs', {
    formatDate: date => dayjs(date).format(formats.date),
    formatDateTime: date => dayjs(date).format(formats.dateTime)
  })
}
