import Constants from 'expo-constants';
import { Body, Button, CheckBox, Icon, List, ListItem, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Animated, StyleSheet,
  View, Image, ActivityIndicator
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import { ORDERS_SLIDING_VEHICLE_TYPE_TITLE_1, ORDERS_SLIDING_VEHICLE_TYPE_TITLE_2, ORDERS_SLIDING_VEHICLE_TYPE_TITLE_3 } from '../../../config/strings';
import { color, fontSize, fontWeight, iconSize, isiOS, screenSize } from '../../../styles/theme';

type MyProps = {
  onNextScreen: (address, extraOptionsSelected) => void,
  forwardRef: any,
  extraOptions: any,
  isLoading: boolean,
}
const SlidingPanelVehicleType: React.FunctionComponent<MyProps> = ({ onNextScreen, forwardRef, extraOptions, isLoading }) => {
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
    if (name == 'chico') {
        return small;
    } else if (name == 'mediano') {
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
          <Button 
            transparent
            style={styles.closeButton}
            onPress={() => {
              // @ts-ignore
              panelRef.current.show(hideFullScreenPanelOptions);
            }}>
              <Icon 
                name="close-outline"
                style={{
                    fontSize: iconSize.XL, 
                    color: color.grey.slateGrey
                }} />
          </Button>

          <View style={styles.basicVehicleTypeInfo}>
            <View style={{ flex: 1 }}>
              <Image 
                style={styles.imageVehicleType} 
                resizeMode='contain'
                source={getVehicleTypeImage(vehicleType.name)} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 10 }}>
                Tipo: <Text style={{ fontSize: fontSize.XL }}>{vehicleType.name}</Text>
              </Text>
              <Text style={{ marginBottom: 5 }}>Precio: </Text>
              <Text style={{ marginBottom: 10, marginStart: 30 }}>$ 
                <Text style={{ fontSize: fontSize.XL }}>
                  {vehicleType.pricePerHour}
                </Text> p/hora
              </Text>
            </View>
          </View>
          <View style={styles.moreVehicleTypeInfo}>
            <View style={styles.moreVehicleTypeInfoItem}>
              <Text>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_1}</Text>
              <Text style={{ fontSize: fontSize.XL }}>600 Kg</Text>
            </View>
            <View style={styles.moreVehicleTypeInfoItem}>
              <Text>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_2}</Text>
              <Text style={{ fontSize: fontSize.XL }}>{vehicleType.open}pepe</Text>
            </View>
          </View>
          <View style={styles.extraOptionsVehicleType}>
            <Text style={{ marginBottom: 5 }}>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_3}</Text>
            <List
              style={[styles.listExtraOptionsVehicleType, { maxHeight: draggableRange.top * 0.35 }]}
              dataArray={extraOptionsSelected}
              renderRow={(extra) =>
                <ListItem 
                  key={extra.orderAvailableExtraOptionId}
                  onPress={() => onAddOrRemoveExtraOption(extra)}>
                  <CheckBox checked={extra.selected} />
                  <Body style={styles.listItemExtraOptionsVehicleType}>
                    <Text>{extra.text}:</Text>
                    <Text>
                      <Text style={{ fontSize: fontSize.L }}>+</Text> $ <Text style={{ fontSize: fontSize.L }}>{extra.price}</Text>
                    </Text>
                  </Body>
                </ListItem>
              }>
            </List>
          </View>
          <View style={[styles.containerbutton, { 
            bottom: (deviceHeight - draggableRange.top) + 20,
            left: (deviceWidth * 0.1) / 2
          }]}>
            <Button 
              // @ts-ignore
              style={styles.button}
              onPress={() => onNextScreen(vehicleType, extraOptionsSelected)}>
                {
                  isLoading ?
                    <ActivityIndicator />
                  :
                  <Text style={styles.textButton}>
                      Continuar
                    </Text>
                }
            </Button>
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
    justifyContent: "flex-end",
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
    marginVertical: 5,
    flexDirection: 'column',
  },
  moreVehicleTypeInfoItem: {
    marginVertical: 3, 
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
    alignItems: 'center'
  },
  containerbutton: {
    zIndex: 9,
    elevation: 7,
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
  },
  button: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: "center"
  },
  textButton: {
    color: color.white.white, 
    fontSize: fontSize.XL, 
    fontWeight: fontWeight.L, 
    textAlign: 'center'
  },
});

export default SlidingPanelVehicleType;