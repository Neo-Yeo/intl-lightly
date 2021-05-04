
interface IntlConfig {
  locales?: DefaultLoclae,
  currentLocal?: string,
}

interface DefaultLoclae { [key: string]: any }



class IntlLightly {
  private _locales: DefaultLoclae;
  private _current: string;
  constructor() {
    this._locales = {};
    this._current = '';
  }
  get current() {
    return this._current;
  }
  get locales() {
    return this._locales;
  }
  init(config: IntlConfig = {}) {

    if (config.locales) {
      Object.entries(config.locales).forEach(([k, v]) => {
        this._locales[k] = v;
      });
    }
    if (config.currentLocal) {
      this.change(config.currentLocal)
    }
  }

  add(localeCode: string, localeData: { [key: string]: any }) {
    this._locales[localeCode] = localeData;
  }

  change(localeCode: string) {
    if (this._locales[localeCode] === undefined) {
      throw new Error(`Locale [${localeCode}] is not defined; make sure you had call addLocle`);
    }
    this._current = localeCode;
  }

  get(key: string) {
    if (/^\w.*\..*\w$/.test(key)) {
      let [top, ...deepKeys] = key.split('.');
      let first = this._locales[this._current];
      return deepKeys.reduce((acc, cur) => {
        if (acc instanceof Object) {
          return acc[cur]
        }
        return acc
      }, first[top]);
    }

    return this._locales[this._current][key];
  }

  select<Tlocale = DefaultLoclae, Tselected = unknown>(
    selector: (s: Tlocale) => Tselected
  ) {
    if (typeof selector !== 'function') {
      console.error("Intl: selector should be a function");
      return ''
    }
    return selector(this._locales[this._current])
  };

  replace = function (template: string, kv: Record<string, string | number>) {
    Object.entries(kv).forEach(([k, v]) => {
      let reg = new RegExp(`{${k}}`, 'g')
      template = template.replace(reg, String(v))
    })
    return template
  }

  getReplaced = (key: string, kv: Record<string, string | number>) => {
    let target = this.get(key);
    if (typeof target === 'string') {
      return this.replace(target, kv)
    };
    return ''
  }

}
const intl = new IntlLightly();

export default intl;


