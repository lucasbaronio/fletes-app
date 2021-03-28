import { Body, Button, Card, CardItem, Form, H1, H2, Icon, Input, Item, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Platform, Animated, StyleSheet,
  useWindowDimensions, View, Image
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';

const ios = Platform.OS === 'ios';

type MyProps = {
  vehicleType: {
    name: string,
    open: boolean,
    pricePerHour: number,
    vehicleTypeId: number,
  },
  onNextScreen: (address) => void,
  forwardRef: any,
}
const SlidingPanelVehicleType: React.FunctionComponent<MyProps> = ({ onNextScreen, forwardRef }) => {
  const deviceHeight = useWindowDimensions().height;
  const deviceWidth = useWindowDimensions().width;
  const draggableRange = {
    top: deviceHeight * 0.6,
    bottom: 0
  };

  const snappingPoints = [
    draggableRange.top,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const secondTextInputRef = useRef<Input | null>(null);
  const thirdTextInputRef = useRef<Input | null>(null);
  const [atTop, setAtTop] = useState(false);
  const [panelPositionVal, setPanelPositionVal] = useState(new Animated.Value(draggableRange.bottom));
  const [vehicleType, setVehicleType] = useState({
    name: '',
    open: false,
    pricePerHour: 0,
    vehicleTypeId: 0,
  });

  forwardRef((vehicleType) => {
    setVehicleType(vehicleType)
    // @ts-ignore
    panelRef.current.show();
  });

  // fired when panel is finished being dragged up or down
  // if panel is dragged to 'top' position, then we switch to scrollmode
  // const onMomentumDragEnd = useCallback((value: number) => {
  //   if (value === draggableRange.top) {
  //     setAtTop(true);
  //   } if (value === draggableRange.bottom) {
  //     setAtTop(false);
  //   }
  // }, [draggableRange]);
  
  const PANEL_VELOCITY = ios ? 2 : 2.3;
  const hideFullScreenPanelOptions: SlidingUpPanelAnimationConfig = {
    velocity: PANEL_VELOCITY,
    toValue: draggableRange.bottom
  };
  
  // if panel is at the top and scrolling is allowed
  // check the velocity of the drag,
  // if the velocity is downward, then we animate the panel to its bottom state
  // if the velocity is upward, we treat the drag like a scroll instead
  // const onDragStart = useCallback((_: number, gestureState: PanResponderGestureState) => {
  //   if (atTop) {
  //     if (gestureState.vy > 0) {
  //       if (ios) {
  //         setAllowDragging(true);
  //       }
  //       if (panelRef && panelRef.current) {
  //         panelRef.current.show(hideFullScreenPanelOptions);
  //       }
  //     } else {
        
        
  //       if (ios) {
  //       }
  //     }
  //   }
  // }, [atTop, panelRef]);

  const _onAnimatedValueChange = ({ value }) => {
    const {top, bottom} = draggableRange;
    const delta = top - bottom;
    const valuePCT = ((value - bottom) * 100) / delta;

    if (value === top) {
      setAtTop(true);
    }
    if (value === bottom) {
      setAtTop(false);
    }
  }

  useEffect(() => {
		const slidingListener = panelPositionVal.addListener(
			_onAnimatedValueChange,
		);
		return () => panelPositionVal.removeListener(slidingListener);
	}, [panelPositionVal]);

  return (
    <SlidingUpPanel
        // @ts-ignore
        ref={panelRef}
        animatedValue={panelPositionVal}
        draggableRange={draggableRange}
        snappingPoints={snappingPoints}
        // backdropOpacity={}
        showBackdrop={true}
        height={deviceHeight}
        // allowDragging={allowDragging}
        allowDragging={true}
        // onMomentumDragEnd={onMomentumDragEnd}
        // onDragStart={onDragStart}
        containerStyle={{ zIndex: 10, elevation: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
    >
        <View style={styles.panelContent}>
          <Button 
            transparent
            style={{ width: '100%', justifyContent: "flex-end" }}
            onPress={() => {
              setAtTop(false);
              // @ts-ignore
              panelRef.current.show(hideFullScreenPanelOptions);
            }}>
              <Icon fontSize={40} name='close-outline' />
          </Button>

          <View style={{ width: '90%', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Image 
                style={{ width: 150, height: 90 }} 
                resizeMode='contain'
                source={vehicleType.name == 'chico' ?
                    require('../../../../assets/vehicleType_chico.jpeg')
                    :vehicleType.name == 'mediano' ?
                    require('../../../../assets/vehicleType_mediano.jpeg')
                    :require('../../../../assets/vehicleType_grande.jpeg')} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 10 }}>Tipo: <H2>{vehicleType.name}</H2></Text>
              <Text style={{ marginBottom: 5 }}>Precio: </Text>
              <Text style={{ marginBottom: 10, marginStart: 30 }}>$ <H1>{vehicleType.pricePerHour}</H1> por hora</Text>
            </View>
          </View>
          <View style={{ width: '90%', marginVertical: 10 }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Capacidad de carga: </Text>
                <H2>600 Kg</H2>
              </View>
              <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Caja Abierta/Cerrada: </Text>
                <H2>{vehicleType.open}pepe</H2>
              </View>
            </View>
          </View>
          
          <View style={[styles.button, { 
            bottom: (deviceHeight - draggableRange.top) + 20,
            left: (deviceWidth * 0.1) / 2,
          }]}>
            <Button 
              // @ts-ignore
              style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}
              onPress={() => onNextScreen(vehicleType)}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                    Siguiente
                </Text>
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
  viewText: {
    paddingVertical: 10,
  },
  button: {
    zIndex: 9,
    elevation: 7,
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
  },
});

export default SlidingPanelVehicleType;