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