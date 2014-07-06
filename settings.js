module.exports = {
    id: 'duigou',
    name: 'duigou',
    creator: 'henryleu',
    secretKey: 'quick',
    app: {
        host: '127.0.0.1',
        port: 3010
    },
    oauth: {
        providerHost: 'http://testu2.staff.xdf.cn',
        providerAuthorizeUri: '',
        providerAccessTokenUri: '/apis/OAuth.ashx',
        providerLogoutUri: '/Logout.aspx',
        clientId: '95402',
        clientSecret: 'u2test-app1-d20-9c5f-4783-8316-ee814test',
        clientHost: 'http://testvps.xdf.cn'
    },
    mysql:{
        host: 'localhost',
        user: 'duigou',
        password: 'duigou',
        database:'duigou',
        port: 3306
    },
    redis:{
        host: 'localhost',
        port: 6379
    },
    session: {
        expires: 60 // minutes
    },
    logging: {
        reloadSecs: 0, //INFO: set 0 could let nodeunit tests which use log4js exit properly
        level: 'DEBUG'
    },
    file: {
        public: 'public',
        build: 'public/build',
        components: 'public/components',
        upload: 'public/upload',
        question: 'public/upload/question',
        answer: 'public/upload/answer'
    },
    resources: {
        appName: '有对勾',
        appTitle: '有对勾',
        appCreator: 'Henry Leu',
        errorUnknown: '不好意思，系统出了点小问题'
    }

};
