import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  'en-US': {
    message: {
      locale: 'en-US',
      title: 'Workdays',
      income: 'Income',
      total: 'total',
      start: 'start',
      end: 'end',
      hours: 'hours',
      nodata: 'No data available',
      setincome: {
        title: 'Set Income',
        label: 'Ingreso'
      },
      list: {
        selectmonth: 'Active month'
      },
      buttons: {
        save: 'save',
        edit: 'edit',
        delete: 'delete'
      }
    }
  },
  'es-ES': {
    message: {
      locale: 'es-ES',
      title: 'Horas Trabajadas',
      income: 'Ingreso',
      total: 'Suma Total',
      start: 'desde',
      end: 'hasta',
      hours: 'horas',
      nodata: 'No existen datos',
      setincome: {
        title: 'Fijar Ingreso',
        label: 'Ingreso'
      },
      list: {
        selectmonth: 'Mes activo'
      },
      buttons: {
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar'
      }
    }
  },
  'de-DE': {
    message: {
      locale: 'de-DE',
      title: 'Arbeitszeiten',
      income: 'Stundenlohn',
      total: 'Gesamt',
      start: 'von',
      end: 'bis',
      hours: 'Stunde',
      nodata: 'Keine verfügbare Daten',
      setincome: {
        title: 'Stundenlohn bearbeiten',
        label: 'Stundenlohn'
      },
      list: {
        selectmonth: 'Monat'
      },
      buttons: {
        save: 'Speichern',
        edit: 'Bearbeiten',
        delete: 'löschen'
      }
    }
  }
}

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'es-ES': {
    currency: {
      style: 'currency', currency: 'EUR'
    }
  },
  'de-DE': {
    currency: {
      style: 'currency', currency: 'EUR'
    }
  }
}

const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    },
    time: {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  },
  'es-ES': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    },
    time: {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  },
  'de-DE': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    },
    time: {
      hour: 'numeric',
      minute: 'numeric',
      hour24: true
    }
  }
}

export default new VueI18n({
  locale: 'es-ES', // set default locale
  messages,
  numberFormats,
  dateTimeFormats
})
