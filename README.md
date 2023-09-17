# intl-lightly
A lightweight localization library.

# Getting Started

1. Install
    ```bash
    #npm
    pnpm i intl-lightly

    #npm
    npm i intl-lightly

    #yarn
    yarn add intl-lighly
    ```



2. Initialize
    ```js
    // eg: boot.js
    import intl from 'inty-lightly'
    import enLocale from './languages/en-US'
    import zhLocale from './languages/zh-US'

    // locales already build in
    intl.init({
      locales:{
        'en-US':enLocale
        'zh-CN':zhLocale
      },
      currentLocales:'en-US'
    })

    // or if locale is dynamic load
    const zhCN = await import('./languages/zh-US') 
    intl.add('zh-CN',zhCN)

    ```

# Features
* Not only `key`=>`string` but `key`=>`object`
    ```js
        const enUS= {
            hi:'Hi',
            buttons:{
                submit:'Submit',
                cancel:'Cancel'
            }
        }

    ```
* Multiple way to get value
    ```js

    intl.get('hi')

    intl.get('buttons.submit')

    intl.select( s =>{
        return {
            user:s.user,
            submitBtn:s.buttons.submit
        }
    })

    ```
* Template support
    ```js
    // assume you had locale data like this
    const enUS = {
        greet:'Hi,{userName}!'
        formTip:{
             input:'Please input {label}',
             min:"Can't smaller than {min}"
        }
    }

    //useCase.js
    intl.getReplaced('greet',{userName:'Neo'})// 'Hi,Neo!'

    const formTip = intl.get('formTip')
    intl.replace(formTip.input,{label:'First Name'}) // 'Please input First Name'
    ```

# Typesafe Usege

1. declare language

    ```ts
    //en-US.ts
    const enLocale = {
        hi: 'Hi',
        table:{
            createdAt: 'Created At'
        }
        user:{
          name: 'Name'
        }
    }
    export type EnLocal = typeof enLocale
    export default enLocale
    ```
1. declare typesafe select function
    
    ```ts
    //pickLocale.ts
    import intl from 'intl-lightly'
    import { EnLocal } from '../locales/en-gb'

    /**
    * Pick some locale with intellisense
    */
    export function pickLocale<T extends (local: EnLocal) => any>(pick: T) {
        return intl.select<EnLocal, ReturnType<T>>(pick)
    }
    ```
1. Use `pickLocale` in component
    ```tsx
    export function Profile(){
        const locale = pickLocale(s=>s.user)
        return (<div>
            <div>{locale.name}</div>
        </div>)
    }
    ```