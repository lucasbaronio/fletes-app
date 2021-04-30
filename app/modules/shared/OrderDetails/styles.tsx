import { Dimensions, StyleSheet } from 'react-native';
import { color, fontSize, fontWeight, screenSize } from '../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'whitesmoke',
    },
    containerHeaderComponent: {
      flex: 1, 
      flexDirection: 'column', 
      backgroundColor: color.white.white, 
      padding: 15
    },
    containerHeaderVehicleType: {
      flex: 1, 
      flexDirection: 'column', 
      marginVertical: 5
    },
    titleHeaderVehicleType: {
      flex: 1, 
      fontWeight: fontWeight.L
    },
    subtitleHeaderVehicleType: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginVertical: 5, 
      marginLeft: 20
    },
    containerHeaderExtraOptions: {
      flex: 1, 
      flexDirection: 'column', 
      marginVertical: 5
    },
    titleHeaderExtraOptions: {
      flex: 1, 
      fontWeight: fontWeight.L,
    },
    subtitleHeaderExtraOptions: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginVertical: 5, 
      marginLeft: 20
    },
    separatorHeader: {
      width: '100%', 
      height: 10, 
      borderBottomWidth: 0.3, 
      borderBottomColor: color.grey.lightGrey
    },
    containerTotalHeader: { 
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginVertical: 5 
    },
    keyTextTotalHeader: { 
      flex: 1, 
      fontWeight: fontWeight.L, 
      fontSize: fontSize.M
    },
    valueTextTotalHeader: { 
      fontWeight: fontWeight.L, 
      fontSize: fontSize.M
    },
    footer: {
      flex: 1, 
      marginVertical: 40
    },
    containerButton: {
      zIndex: 9,
      elevation: 7,
      position: 'absolute',
      flexDirection: 'row',
      width: '90%',
      bottom: 20,
      left: (screenSize.width * 0.1) / 2,
    },
    button: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: "center"
    },
    textButton: {
      color: color.white.white, 
      fontSize: fontSize.L, 
      fontWeight: fontWeight.L, 
      textAlign: 'center'
    },
    constinerSectionItem: {
      flex: 1, 
      flexDirection: 'column', 
      marginHorizontal: 10, 
      padding: 10, 
      backgroundColor: color.white.white, 
      borderRadius: 5
    },
    subtitleSectionItem: {
      fontWeight: fontWeight.L, 
      marginBottom: 5
    },
    valueSectionItem: {
      color: color.grey.slateGrey
    },
    containerSectionHeader: {
      paddingHorizontal: 20, 
      paddingBottom: 15, 
      paddingTop: 25, 
      backgroundColor: color.white.whitesmoke,
    },
    textSectionHeader: {
      fontWeight: fontWeight.L, 
      fontSize: fontSize.M
    },
    separator: {
      flex: 1, 
      marginHorizontal: 20, 
      height: 1, 
      borderBottomWidth: 0.3, 
      borderBottomColor: color.grey.lightGrey,
    }
});

export default styles;
