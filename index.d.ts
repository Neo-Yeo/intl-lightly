interface IntlConfig {
    locales?: DefaultLoclae;
    currentLocal?: string;
}
interface DefaultLoclae {
    [key: string]: any;
}
declare class IntlLightly {
    private _locales;
    private _current;
    constructor();
    get current(): string;
    get locales(): DefaultLoclae;

    /**
     * @example
     * intl.init({
     * currentLocale:"en-US",
     * locales:{
     *  'en-Us':{hi:'Hi!'},
     *  'zh-CN':{hi:'你好!'}
     *  }
     * })
     */
    init(config?: IntlConfig): void;

    /**
     * add locale data
     * @example
     * intl.add('en-US',{hi:'Hi',user:{name:'Name'}}) 
     */
    add(localeCode: string, localeData: {
        [key: string]: any;
    }): void;

    /**
     * change the current locale
     * @example
     * intl.change('zh-CN')
     */
    change(localeCode: string): void;

    /**
     * get one value
     * @example
     * //get value
     * intl.get('greet')
     * 
     * //or get deep value
     * intl.get('login.account')
     */
    get(key: string): any;

    /**
     * get by selector
     * @example
     * intl.select(s=>s.user)
     */
    select<Tlocale = DefaultLoclae, Tselected = unknown>(selector: (s: Tlocale) => Tselected): Tselected;

    /**
     * replace the placeholder in template string with real value
     * @example
     * intl.replace('Hi,{name}!',{name:'Neo'})
     * //output 'Hi,Neo!'
     */
    replace: (template: string, kv: Record<string, string | number>) => string;

    /**
     * it will call intl.get and then intl.replace
     * @example 
     * intl.getReplaced('greet',{name:'Neo'})
     */
    getReplaced: (key: string, kv: Record<string, string | number>) => string;
}
declare const intl: IntlLightly;
export default intl;
