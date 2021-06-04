import { StyleSheet } from 'react-native';
import { color, fontSize, fontWeight } from '../../../../styles/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rowContainer: {
        flex: 1, 
        justifyContent: "center", 
        flexDirection: 'row',
    },
    button: {
        paddingVertical: 15, 
        backgroundColor: color.primary.dark,
        borderRadius: 10,
    },
    textButton: {
        color: color.white.white, 
        fontSize: fontSize.L, 
        fontWeight: fontWeight.L, 
        textAlign: 'center'
    },
});

export default styles;
