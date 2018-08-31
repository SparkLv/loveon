import { StyleSheet } from "react-native";

export const Cover = StyleSheet.create({
    coverImg: {
        width: "100%",
        height: "100%",
        flexDirection: "row-reverse"
    },
    skipBox: {
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 30,
        borderStyle: "solid",
        borderWidth: 1.5,
        borderColor: "#fff",
        borderRadius: 5,
        marginRight: 15,
        marginTop: 15
    },
    skipText: {
        color: "#fff"
    }
})

export const Register = StyleSheet.create({
    outerBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff'
    },
    upImg: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    headBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 150,
        height: 150,
    },
    registerForm: {
        width: '90%'
    },
    registerBtn: {
        backgroundColor: '#3897f3',
        borderWidth: 1,
        borderColor: '#3897f3',
        borderRadius: 4,
        height: 40

    },
    registerDisBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c6ddeb',
        borderRadius: 4,
        height: 40

    },
    registerBtnText: {
        color: '#fff',
        textAlign: 'center',
        lineHeight: 40
    },
    registerDisBtnText: {
        color: '#c6ddeb',
        textAlign: 'center',
        lineHeight: 40
    },
    registerBlock: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#dbdbdb'
    }
})

export const Login = StyleSheet.create({
    outerBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff'
    },
    loginForm: {
        width: '90%'
    },
    loginBtn: {
        backgroundColor: '#3897f3',
        borderWidth: 1,
        borderColor: '#3897f3',
        borderRadius: 4,
        height: 40

    },
    loginDisBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c6ddeb',
        borderRadius: 4,
        height: 40

    },
    loginBtnText: {
        color: '#fff',
        textAlign: 'center',
        lineHeight: 40
    },
    loginDisBtnText: {
        color: '#c6ddeb',
        textAlign: 'center',
        lineHeight: 40
    },
    registerBlock: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#dbdbdb'
    }
})

export const FavBox = StyleSheet.create({
    FavBox: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    FavBoxHeadImg: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    FavBoxImg: {
        width: 80,
        height: 80
    },
    name: {
        fontSize: 16,
        color: '#4285f4',
        marginBottom: 10
    }
})

export const imgDetail = StyleSheet.create({
    img: {
        position: "absolute",
        top: 0,
        left: 10,
        width: 25,
        height: 25
    }
})

export const info = StyleSheet.create({
    outerBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        position: 'relative'
    },
    topBar: {
        position: 'relative',
        width: '100%',
        height: 50,
        backgroundColor: "#1b82d1",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBarLeftBtn: {
        position: "absolute",
        left: 10,
        top: 13
    },
    chatText: {
        color: '#000',
        marginLeft: 10,
        marginRight: 10,
        padding: 8,
        maxWidth: 200
    },
    inputBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        alignItems: 'center',
        height: 50,
        paddingLeft: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#e7e8e9'
    },
    inputBoxHead: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    inputBoxInput: {
        borderBottomWidth: 0,
        marginLeft: 10,
        marginTop: 5,
        width: 200,
        textAlignVertical: 'top'
    }
})

export const More = StyleSheet.create({
    listBox: {
        height: 65,
        backgroundColor: '#1b82d1',
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        width: '100%',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    usernameText: {
        color: "#fff",
        marginLeft: 10
    },
    logoutBtn: {
        width: '80%',
        height: 40,
        backgroundColor: '#e56f5a',
        position: 'absolute',
        bottom: 50
    },
    logoutBtnText: {
        color: '#fff',
        lineHeight: 40,
        textAlign: 'center'
    }
})