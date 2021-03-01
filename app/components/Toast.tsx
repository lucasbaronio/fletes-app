import { Toast } from "native-base"

export const showToast = (message) => {
    Toast.show({
        text: message,
        buttonText: "OK",
        buttonTextStyle: { color: "#008000" },
        buttonStyle: { backgroundColor: "#5cb85c" },
        duration: 300000
    })
}