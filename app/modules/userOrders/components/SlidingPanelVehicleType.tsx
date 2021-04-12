import { Body, Button, Card, CardItem, CheckBox, Form, H1, H2, H3, Icon, Input, Item, List, ListItem, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Platform, Animated, StyleSheet,
  useWindowDimensions, View, Image, SafeAreaView, ScrollView, ActivityIndicator
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';

const ios = Platform.OS === 'ios';

type MyProps = {
  onNextScreen: (address, extraOptionsSelected) => void,
  forwardRef: any,
  extraOptions: any,
  isLoading: boolean,
}
const SlidingPanelVehicleType: React.FunctionComponent<MyProps> = ({ onNextScreen, forwardRef, extraOptions, isLoading }) => {
  const deviceHeight = useWindowDimensions().height;
  const deviceWidth = useWindowDimensions().width;
  const draggableRange = {
    top: deviceHeight * 0.7,
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
  
  const PANEL_VELOCITY = ios ? 2 : 2.3;
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
        minimumDistanceThreshold={deviceHeight > 800 ? 50 : 30}
        // onMomentumDragEnd={onMomentumDragEnd}
        // onDragStart={onDragStart}
        containerStyle={{ zIndex: 10, elevation: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
    >
        <View style={styles.panelContent}>
          <Button 
            transparent
            style={{ width: '100%', justifyContent: "flex-end" }}
            onPress={() => {
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
              <Text style={{ marginBottom: 10, marginStart: 30 }}>$ <H3>{vehicleType.pricePerHour}</H3> por hora</Text>
            </View>
          </View>
          <View style={{ width: '90%', marginVertical: 5 }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ marginVertical: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Capacidad de carga: </Text>
                <H3>600 Kg</H3>
              </View>
              <View style={{ marginVertical: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Caja Abierta/Cerrada: </Text>
                <H3>{vehicleType.open}pepe</H3>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, width: '90%'}}>
            <Text style={{ marginBottom: 5 }}>Opciones Extra:</Text>
            <List
              style={{ flex: 1, maxHeight: draggableRange.top * 0.3, borderRadius: 5, borderWidth: 1 }}
              dataArray={extraOptionsSelected}
              renderRow={(extra) =>
                <ListItem 
                  key={extra.orderAvailableExtraOptionId}
                  onPress={() => onAddOrRemoveExtraOption(extra)}>
                  <CheckBox checked={extra.selected} />
                  <Body style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{extra.text}:</Text>
                    <Text><H3>+</H3> $<H3>{extra.price}</H3></Text>
                  </Body>
                </ListItem>
              }>
            </List>
          </View>
          <View style={[styles.button, { 
            bottom: (deviceHeight - draggableRange.top) + 20,
            left: (deviceWidth * 0.1) / 2,
          }]}>
            <Button 
              // @ts-ignore
              style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}
              onPress={() => onNextScreen(vehicleType, extraOptionsSelected)}>
                {
                  isLoading ?
                    <ActivityIndicator />
                  :
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
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