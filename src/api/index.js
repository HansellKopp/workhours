const uuidV4 = require('uuid/v4')
const moment = require('moment')
const SETTINGS = 'settings'
const WORK_DAYS_ITEMS = 'workdayItems'

export class WorkDays {
  constructor (storage) {
    this.storage = storage
  }
  getAll () {
    return JSON.parse(this.storage.get(WORK_DAYS_ITEMS)) || []
  }
  getIncomexHour () {
    const settings = JSON.parse(this.storage.get(SETTINGS)) || {hourlyIncome: 0}
    return settings.hourlyIncome
  }
  getIncomexMinute () {
    const settings = JSON.parse(this.storage.get(SETTINGS)) || {hourlyIncome: 0}
    return settings.hourlyIncome / 60
  }
  totalHours () {
    let hours = 0
    let minutes = 0
    this.getAll().map((s) => {
      const item = s.hours.split(':')
      hours += parseInt(item[0], 10)
      minutes += parseInt(item[1], 10)
    })
    if (minutes > 59) {
      hours += Math.floor(minutes / 60)
      minutes = minutes % 60
    }
    return `${('00' + hours).slice(-2)}:${('00' + minutes).slice(-2)}`
  }
  totalIncome () {
    return this.income(this.totalHours())
  }
  income (time) {
    if (!time) {
      return 0
    }
    const settings = JSON.parse(this.storage.get(SETTINGS)) || {hourlyIncome: 0}
    const hours = time.split(':')
    return ((settings.hourlyIncome / 60) * parseInt(hours[1])) +
            (settings.hourlyIncome * parseInt(hours[0], 10))
  }
  setIncome (rate) {
    this.storage.set(SETTINGS, JSON.stringify({hourlyIncome: rate}))
  }
  getById (id) {
    const workdayItems = this.getAll()
    const itemIndex = workdayItems.findIndex(item => item.id === id)
    if (itemIndex >= 0) {
      const item = workdayItems[itemIndex]
      item.itemIndex = itemIndex
      return item
    } else {
      return null
    }
  }
  save (item) {
    const workdayItems = this.getAll()
    const startTime = moment(item.start, 'HH:mm')
    const endTime = moment(item.end, 'HH:mm')
    if (endTime < startTime) {
      endTime.add(1, 'day')
    }
    const duration = moment.duration(endTime.diff(startTime))
    const hours = parseInt(duration.asHours())
    const minutes = parseInt(duration.asMinutes()) - hours * 60
    const lapse = `${hours}:${minutes}`
    const newItem = Object.assign({}, item, {
      id: item.id || uuidV4(),
      hours: lapse,
      income: this.getIncomexHour(lapse)
    })
    const itemIndex = workdayItems.findIndex(s => s.id === item.id)
    if (itemIndex >= 0) {
      workdayItems[itemIndex] = newItem
    } else {
      workdayItems.push(newItem)
    }
    this.storage.set(WORK_DAYS_ITEMS, JSON.stringify(workdayItems))
  }
  delete (id) {
    const workdayItems = this.getAll()
    const itemIndex = workdayItems.findIndex(item => item.id === id)
    if (itemIndex >= 0) {
      workdayItems.splice(itemIndex, 1)
      this.storage.set(WORK_DAYS_ITEMS, JSON.stringify(workdayItems))
    }
  }
}
