import intl from "..";
import {describe,test,expect} from 'vitest'

const enUS = {
    hi: 'Hi',
    user: {
        name: 'Name',
        account: 'Account',
        password: 'Passowrd'
    },
    formTip: {
        input: 'Please input {field}'
    }
}
const zhCN = {
    hi: '你好',
    user: {
        name: '名称',
        account: '账号',
        password: '密码'
    },
    formTip: {
        input: '请输入 {field}'
    }
}
const zhHK = {
    hi: '你好',
    user: {
        name: '名稱',
        account: '帳號',
        password: '密碼'
    },
    formTip: {
        input: '請輸入 {field}'
    }
}


intl.init({
    currentLocal: 'en-US',
    locales: {
        'en-US': enUS,
        'zh-CN': zhCN
    }
});
const config = {
    currentLocal: 'en-US',
    locales: {
        'en-US': enUS,
        'zh-CN': zhCN
    }
}

describe("Initialize", () => {
    test('Call intl.init(config)', () => {
        intl.init(config)
        expect(intl.locales).toEqual(config.locales)
    })
})

describe('Update', () => {

    test("Change current to 'zh-CN'", () => {
        intl.change('zh-CN');
        expect(intl.current).toBe('zh-CN')
        expect(intl.get('hi')).toBe(zhCN.hi)
    })

    test('Add new locale zh-HK', () => {
        intl.add('zh-HK', zhHK)
        expect(intl.locales['zh-HK']).toBe(zhHK)
        expect(intl.get('hi')).toBe(zhCN.hi)
    })

    test("Change current to 'en-US'", () => {
        intl.change('en-US')
        expect(intl.current).toBe('en-US')
    })

})
describe('Get value', () => {

    test('Get one (object or string)', () => {
        expect(intl.get('user')).toBe(enUS.user)
        expect(intl.get('user.name')).toBe(enUS.user.name)
    })

    test('Get by selector', () => expect(intl.select(s => s.user)).toBe(enUS.user))

    test('Replace template', () => expect(intl.replace("Hi {name}!", { name: 'Neo' })).toBe("Hi Neo!"))

    test('Get template and replace it', () => expect(intl.getReplaced("formTip.input", { field: 'Name' })).toBe("Please input Name"))


})

