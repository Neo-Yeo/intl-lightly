# intl-lightly
A lightly localization library for almost any js project.

# Getting Started

1. Install
    ```zsh
    #npm
    npm i intl-lightly

    #yarn
    yarn add intl-lighly
    ```
2. Initialize
    ```js
    // eg: boot.js
    import intl from 'inty-lightly'

    // locales already build in
    intl.init({
        locales:{
        'en-US':{hi:'Hi !'},
        'zh-CN':{hi:'你好 !'}
        },
        currentLocales:'en-US'
    })

    // or if locale is dynamic load
    const enUS = await FetchLocale() 
    intl.add('en-US',enUS)

    ```
3. Useage
    ```js
    // home.js
    import intl from 'intl-lightly'

    console.log(intl.get('hi'))//out put 'Hi !'
    ```

# Future
* Not only key=>string but key=>object
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