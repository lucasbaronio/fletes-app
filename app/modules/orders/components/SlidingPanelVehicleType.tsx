import Constants from 'expo-constants';
import { Body, Button, CheckBox, Icon, List, ListItem, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Animated, StyleSheet,
  View, Image, ActivityIndicator, Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import { ORDERS_SLIDING_VEHICLE_TYPE_TITLE_1, ORDERS_SLIDING_VEHICLE_TYPE_TITLE_2, ORDERS_SLIDING_VEHICLE_TYPE_TITLE_3 } from '../../../config/strings';
import { extraOptionPriceTypes } from '../../../config/utils';
import { color, fontSize, fontWeight, iconSize, isiOS, screenSize } from '../../../styles/theme';
import { API_VEHICLE_TYPE_IMAGE } from '../../../config/constants';

type MyProps = {
  onNextScreen: (address, extraOptionsSelected) => void,
  forwardRef: any,
  extraOptions: any,
  isLoading: boolean,
  token: any,
}
const SlidingPanelVehicleType: React.FunctionComponent<MyProps> = ({ onNextScreen, forwardRef, extraOptions, isLoading, token }) => {
  const deviceHeight = screenSize.height;
  const deviceWidth = screenSize.width;
  const small = require('../../../../assets/vehicleType_chico.jpeg');
  const regular = require('../../../../assets/vehicleType_mediano.jpeg');
  const big = require('../../../../assets/vehicleType_grande.jpeg');
  const draggableRange = {
    top: (deviceHeight - Constants.statusBarHeight) * 0.8,
    bottom: 0
  };

  const snappingPoints = [
    draggableRange.top,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const [panelPositionVal, setPanelPositionVal] = useState(new Animated.Value(draggableRange.bottom));
  const [extraOptionsSelected, setExtraOptionsSelected] = useState(extraOptions.map((extra) => {
    return { ...extra, selected: false }
  }));
  const [vehicleType, setVehicleType] = useState({
    name: '',
    open: false,
    loadCapacity: '',
    pricePerHour: 0,
    vehicleTypeId: 0,
  });

  const onAddOrRemoveExtraOption = (extra) => {
    const id = extra.orderAvailableExtraOptionId;
    const newExtraOptions = extraOptionsSelected.map((item) => {
      return item.orderAvailableExtraOptionId == id ?
      { ...item, selected: !item.selected } : { ...item }
    });
    setExtraOptionsSelected(newExtraOptions);
  };

  forwardRef((vehicleType) => {
    setVehicleType(vehicleType)
    // @ts-ignore
    panelRef.current.show();
  });
  
  const PANEL_VELOCITY = isiOS ? 2 : 2.3;
  const hideFullScreenPanelOptions: SlidingUpPanelAnimationConfig = {
    velocity: PANEL_VELOCITY,
    toValue: draggableRange.bottom
  };

  const _onAnimatedValueChange = ({ value }) => {
    const {top, bottom} = draggableRange;
    const delta = top - bottom;
    const valuePCT = ((value - bottom) * 100) / delta;

    // if (value === top) {
    //   setAtTop(true);
    // }
    // if (value === bottom) {
    //   setAtTop(false);
    // }
  }

  useEffect(() => {
		const slidingListener = panelPositionVal.addListener(
			_onAnimatedValueChange,
		);
		return () => panelPositionVal.removeListener(slidingListener);
	}, [panelPositionVal]);

  const getVehicleTypeImage = (name) => {
    if (name == 'Chico') {
        return small;
    } else if (name == 'Mediano') {
        return regular;
    } else {
        return big;
    }
  }

  return (
    <SlidingUpPanel
        // @ts-ignore
        ref={panelRef}
        animatedValue={panelPositionVal}
        draggableRange={draggableRange}
        snappingPoints={snappingPoints}
        showBackdrop={true}
        height={deviceHeight}
        allowDragging={true}
        minimumDistanceThreshold={deviceHeight > 800 ? 50 : 30}
        // onMomentumDragEnd={onMomentumDragEnd}
        // onDragStart={onDragStart}
        containerStyle={styles.slidingUpPanel}
    >
        <View style={styles.panelContent}>
          <Pressable 
            style={styles.closeButton}
            onPress={() => {
              // @ts-ignore
              panelRef.current.show(hideFullScreenPanelOptions);
            }}>
              {/* <Icon 
                name="close-outline"
                style={{
                    fontSize: iconSize.XL, 
                    color: color.grey.slateGrey
                }} /> */}
              <Ionicons name="ios-close" size={iconSize.L} color={color.primary.dark} />
          </Pressable>

          <View style={styles.basicVehicleTypeInfo}>
            <View style={{ flex: 1 }}>
              <Image 
                style={styles.imageVehicleType} 
                resizeMode='contain'
                defaultSource={require('../../../../assets/default-car.png')}
                source={{ uri: API_VEHICLE_TYPE_IMAGE(vehicleType.vehicleTypeId), headers: token }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 5 }}>
                Tipo: <Text style={{ fontSize: fontSize.XL, color: color.primary.dark }}>{vehicleType.name}</Text>
              </Text>
              <Text>Precio: </Text>
              <Text style={{ marginStart: 30 }}>$ 
                <Text style={{ fontSize: fontSize.XL, color: color.primary.dark }}>
                  {vehicleType.pricePerHour}
                </Text> p/hora
              </Text>
            </View>
          </View>
          <View style={styles.moreVehicleTypeInfo}>
            <View style={styles.moreVehicleTypeInfoItem}>
              <Text>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_1}</Text>
              <Text style={{ fontSize: fontSize.L, color: color.primary.dark }}>{vehicleType.loadCapacity}</Text>
            </View>
            <View style={styles.moreVehicleTypeInfoItem}>
              <Text>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_2}</Text>
              <Text style={{ fontSize: fontSize.L, color: color.primary.dark }}>{vehicleType.open ? 'Abierta' : 'Cerrada'}</Text>
            </View>
          </View>
          <View style={styles.extraOptionsVehicleType}>
            <Text style={{ marginBottom: 5 }}>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_3}</Text>
            <List
              style={[styles.listExtraOptionsVehicleType, { 
                maxHeight: draggableRange.top - ((deviceHeight - draggableRange.top) + 50) - (styles.imageVehicleType.height + styles.imageVehicleType.height * 0.5) ,
              }]}
              dataArray={extraOptionsSelected}
              renderRow={(extra) =>
                <ListItem 
                  key={extra.orderAvailableExtraOptionId}
                  onPress={() => onAddOrRemoveExtraOption(extra)}>
                  <CheckBox color={color.primary.dark} checked={extra.selected} />
                  <View style={[styles.listItemExtraOptionsVehicleType, !isiOS && { marginLeft: 10 }]}>
                    <View style={{ flex: .6 }}>
                      <Text>{extra.text}</Text>
                    </View>
                    <View style={{ flex: .4 }}>
                      {
                        extra.priceType == extraOptionPriceTypes.FIXED ?
                        <Text>
                          <Text style={{ fontSize: fontSize.L }}>+</Text> $ <Text style={{ fontSize: fontSize.L }}>{extra.price}</Text>
                        </Text>
                        :
                        <><Text>
                          <Text style={{ fontSize: fontSize.L }}>+</Text> $ <Text style={{ fontSize: fontSize.L }}>{extra.price}</Text>
                        </Text>
                        <Text style={{ fontSize: fontSize.XS }}>por hora</Text></>
                      }
                      
                    </View>
                  </View>
                </ListItem>
              }>
            </List>
          </View>
          <View style={[styles.containerbutton, { 
            bottom: (deviceHeight - draggableRange.top) + 20,
            left: (deviceWidth * 0.1) / 2
          }]}>
            <Pressable 
              // @ts-ignore
              style={[styles.rowContainer, styles.button]}
              onPress={() => onNextScreen(vehicleType, extraOptionsSelected)}>
                {
                  isLoading ?
                    <ActivityIndicator />
                  :
                  <Text style={styles.textButton}>
                      Continuar
                    </Text>
                }
            </Pressable>
          </View>
        </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  panelContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
  },
  slidingUpPanel: {
    zIndex: 10, 
    elevation: 10, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30
  },
  viewText: {
    paddingVertical: 10,
  },
  closeButton: { 
    width: '100%', 
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginRight: 30,
    marginTop: 10
  },
  basicVehicleTypeInfo:{
    width: '90%', 
    flexDirection: 'row',
  },
  imageVehicleType: {
    width: 150, 
    height: 90
  },
  moreVehicleTypeInfo: {
    width: '90%', 
    marginVertical: 3,
    flexDirection: 'column',
  },
  moreVehicleTypeInfoItem: {
    // marginVertical: 3, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  extraOptionsVehicleType: {
    flex: 1, 
    width: '90%'
  },
  listExtraOptionsVehicleType: {
    flex: 1, 
    borderRadius: 5, 
    borderWidth: 1
  },
  listItemExtraOptionsVehicleType: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  containerbutton: {
    zIndex: 9,
    elevation: 7,
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
  },
  rowContainer: {
    flex: 1, 
    justifyContent: "center", 
    flexDirection: 'row',
  },
  button: {
      paddingVertical: 10, 
      backgroundColor: color.primary.dark,
      borderRadius: 10,
  },
  textButton: {
    color: color.white.white, 
    fontSize: fontSize.XL, 
    fontWeight: fontWeight.L, 
    textAlign: 'center'
  },
});

export default SlidingPanelVehicleType;