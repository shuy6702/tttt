import { View, StyleSheet, Text, TextInput } from "react-native"
import { useState } from "react"

// input có gì: 
// label
// value
// placeholder
// hàm xử lý khi nhập chữ

type inputProps = {
    label: string,
    value: string,
    placeholder: string,
    callback: (inputText: string) => void
}

const MyInput = (props: inputProps) => {

    return (
        <View style={styles.wrapInput}>
            <Text style={{
                fontSize: 16,
                color: "red"
            }}>{props.label}</Text>
            <TextInput value={props.value} onChangeText={(text) => {props.callback(text)}} placeholder={props.placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapInput: {

    }
})

export default MyInput