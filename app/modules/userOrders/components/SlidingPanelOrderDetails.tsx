import Constants from 'expo-constants';
import { Body, Button, CheckBox, H2, H3, Icon, List, ListItem, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Animated, StyleSheet,
  View, Image, ActivityIndicator
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import * as Progress from 'react-native-progress';
import { ORDERS_SLIDING_VEHICLE_TYPE_TITLE_1, ORDERS_SLIDING_VEHICLE_TYPE_TITLE_2, ORDERS_SLIDING_VEHICLE_TYPE_TITLE_3 } from '../../../config/strings';
import { color, fontSize, fontWeight, iconSize, isiOS, screenSize } from '../../../styles/theme';
import { displayDate } from '../../orders/utils/utils';
import { getOrderStatusText } from '../../../config/utils';

type MyProps = {
  onPressAccept: () => void,
  order: any,
  isLoading: boolean,
}
const SlidingPanelOrderDetails: React.FunctionComponent<MyProps> = ({ onPressAccept, order, isLoading }) => {
  const deviceHeight = screenSize.height;
  const deviceWidth = screenSize.width;
  const small = require('../../../../assets/vehicleType_chico.jpeg');
  const regular = require('../../../../assets/vehicleType_mediano.jpeg');
  const big = require('../../../../assets/vehicleType_grande.jpeg');
  const draggableRange = {
    top: (deviceHeight - Constants.statusBarHeight) * 0.9,
    bottom: (deviceHeight - Constants.statusBarHeight) * 0.5,
  };

  const snappingPoints = [
    draggableRange.top,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const [panelPositionVal, setPanelPositionVal] = useState(new Animated.Value(draggableRange.bottom));
  // const [extraOptionsSelected, setExtraOptionsSelected] = useState(extraOptions.map((extra) => {
  //   return { ...extra, selected: false }
  // }));
  const [vehicleType, setVehicleType] = useState({
    name: '',
    open: false,
    pricePerHour: 0,
    vehicleTypeId: 0,
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
            style={styles.dragButton}
            onPress={() => {
              // @ts-ignore
              panelRef.current.show(hideFullScreenPanelOptions);
            }}>
              <View style={{
                  borderWidth: 3,
                  width: screenSize.width * 0.15, 
                  borderRadius: 3,
                  borderColor: color.grey.lightGrey
                }}>
              </View>
          </Button>

          <View style={styles.timeNextStatusContainer}>
            <View>
              <Text style={styles.timeNextStatusText}>
                Fecha/Hora de llegada del transportista
                </Text>
            </View>
            <View>
              <Text style={styles.timeNextStatusValue}>
                {displayDate(order.originAt)}
                </Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              // indeterminate 
              progress={1}
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              // indeterminate 
              progress={1}
              // width={70} 
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate 
              // width={70} 
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              // indeterminate 
              progress={0}
              // width={70} 
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{getOrderStatusText(order.status)}</Text>
          </View>

          {/* <View style={styles.basicVehicleTypeInfo}>
            <View style={{ flex: 1 }}>
              <Image 
                style={styles.imageVehicleType} 
                resizeMode='contain'
                source={getVehicleTypeImage(vehicleType.name)} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 10 }}>Tipo: <H2>{vehicleType.name}</H2></Text>
              <Text style={{ marginBottom: 5 }}>Precio: </Text>
              <Text style={{ marginBottom: 10, marginStart: 30 }}>$ <H3>{vehicleType.pricePerHour}</H3> por hora</Text>
            </View>
          </View>
          <View style={styles.moreVehicleTypeInfo}>
            <View style={styles.moreVehicleTypeInfoItem}>
              <Text>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_1}</Text>
              <H3>600 Kg</H3>
            </View>
            <View style={styles.moreVehicleTypeInfoItem}>
              <Text>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_2}</Text>
              <H3>{vehicleType.open}pepe</H3>
            </View>
          </View> */}
          {/* <View style={styles.extraOptionsVehicleType}>
            <Text style={{ marginBottom: 5 }}>{ORDERS_SLIDING_VEHICLE_TYPE_TITLE_3}</Text>
            <List
              style={[styles.listExtraOptionsVehicleType, { maxHeight: draggableRange.top * 0.3 }]}
              dataArray={extraOptionsSelected}
              renderRow={(extra) =>
                <ListItem 
                  key={extra.orderAvailableExtraOptionId}
                  onPress={() => onAddOrRemoveExtraOption(extra)}>
                  <CheckBox checked={extra.selected} />
                  <Body style={styles.listItemExtraOptionsVehicleType}>
                    <Text>{extra.text}:</Text>
                    <Text><H3>+</H3> $<H3>{extra.price}</H3></Text>
                  </Body>
                </ListItem>
              }>
            </List>
          </View> */}
          <View style={[styles.containerbutton, { 
            bottom: (deviceHeight - draggableRange.top) + 20,
            left: (deviceWidth * 0.1) / 2
          }]}>
            <Button 
              // @ts-ignore
              style={styles.button}
              onPress={() => onPressAccept()}>
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
    backgroundColor: color.white.whitesmoke,
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
  dragButton: { 
    width: '100%', 
    justifyContent: "center",
  },
  timeNextStatusContainer:{
    width: '90%', 
    flexDirection: 'column',
  },
  timeNextStatusText: {
    marginVertical: 5,
    fontSize: fontSize.XS,
    color: color.grey.slateGrey
  },
  timeNextStatusValue: {
    fontSize: fontSize.L,
    fontWeight: fontWeight.L
  },
  progressBarContainer: {
    width: '90%', 
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  statusContainer: {
    width: '90%',
    marginVertical: 5,
  },
  statusText: {
    fontSize: fontSize.M, 
    fontWeight: fontWeight.M
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

export default SlidingPanelOrderDetails;