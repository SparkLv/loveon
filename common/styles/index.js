import { StyleSheet } from "react-native";

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