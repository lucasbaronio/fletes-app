import { Accordion, Button, Form, Icon, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Animated, StyleSheet,
  View, ActivityIndicator,
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import Constants from 'expo-constants';
import AddressForm from './AddressForm';
import DateTime from './DateTime';
import { currentDate } from '../utils/utils';
import { color, fontSize, fontWeight, isiOS, screenSize } from '../../../styles/theme';
import { ORDERS_SCENES_MAP_ADDRESS_SLIDINGPANEL_TITLE_1, ORDERS_SCENES_MAP_ADDRESS_SLIDINGPANEL_TITLE_2 } from '../../../config/strings';

type MyProps = {
  onNextScreen: (address, date) => void,
  isLoading: boolean,
}
const SlidingPanelAddress: React.FunctionComponent<MyProps> = ({ onNextScreen, isLoading }) => {
  const deviceHeight = screenSize.height;
  const deviceWidth = screenSize.width;
  const draggableRange = {
    top: deviceHeight - Constants.statusBarHeight,
    bottom: deviceHeight * 0.13
  };

  const snappingPoints = [
    draggableRange.top,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const [atTop, setAtTop] = useState(false);
  const [panelPositionVal, setPanelPositionVal] = useState(new Animated.Value(draggableRange.bottom));
  const [streetNameOrigin, setStreetNameOrigin] = useState('Vazquez Ledesma');
  const [streetNumberOrigin, setStreetNumberOrigin] = useState('2983');
  const [doorNumberOrigin, setDoorNumberOrigin] = useState('4C');
  const [streetNameDestination, setStreetNameDestination] = useState('18 de Julio');
  const [streetNumberDestination, setStreetNumberDestination] = useState('1214');
  const [doorNumberDestination, setDoorNumberDestination] = useState('3B');
  // const [streetNameOrigin, setStreetNameOrigin] = useState('');
  // const [streetNumberOrigin, setStreetNumberOrigin] = useState('');
  // const [doorNumberOrigin, setDoorNumberOrigin] = useState('');
  // const [streetNameDestination, setStreetNameDestination] = useState('');
  // const [streetNumberDestination, setStreetNumberDestination] = useState('');
  // const [doorNumberDestination, setDoorNumberDestination] = useState('');
  const [dateOrder, setDateOrder] = useState<string>(currentDate());

  const dataArray = [
    { title: "Dirección Origen 🔴", content: "origin" },
    { title: "Dirección Destino 🔵", content: "destination" },
    { title: "Fecha y hora", content: "datetime" },
  ];
  
  const PANEL_VELOCITY = isiOS ? 2 : 2.3;
  const hideFullScreenPanelOptions: SlidingUpPanelAnimationConfig = {
    velocity: PANEL_VELOCITY,
    toValue: draggableRange.bottom
  };

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
        showBackdrop={true}
        height={deviceHeight}
        allowDragging={true}
        containerStyle={styles.slidingUpPanel}
    >
        <View style={styles.panelContent}>
              {
                atTop ?
                <Button 
                  transparent
                  style={{ width: '100%', justifyContent: "center" }}
                  onPress={() => {
                    setAtTop(false);
                    // @ts-ignore
                    panelRef.current.show(hideFullScreenPanelOptions);
                  }}>
                    <Icon name='chevron-down-outline' />
                </Button>
                : 
                <Button 
                  transparent
                  style={{ width: '100%', justifyContent: "center" }}
                  onPress={() => {
                    setAtTop(true);
                    // @ts-ignore
                    panelRef.current.show();
                  }}>
                    <Icon name='chevron-up-outline' />
                </Button>
              }
              
              <Form style={styles.form}>
                <View style={styles.viewText}>
                  {
                    atTop ?
                    <Text style={{ textAlign: 'center' }}>
                      {ORDERS_SCENES_MAP_ADDRESS_SLIDINGPANEL_TITLE_1}
                    </Text>
                    : 
                    <Text style={{ textAlign: 'center' }}>
                      {ORDERS_SCENES_MAP_ADDRESS_SLIDINGPANEL_TITLE_2}
                    </Text>
                  }
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', marginVertical: 10 }}>
                <Accordion 
                      dataArray={dataArray}
                      animation={true}
                      // @ts-ignore
                      expanded={[0]}
                      // expanded={true}
                      renderHeader={(item, expanded) => (
                        <View style={styles.accordion}>
                          <Text 
                            // @ts-ignore
                            style={{ fontWeight: fontWeight.L }}>
                            {item.title}
                          </Text>
                          {expanded
                            ? <Icon style={{ fontSize: fontSize.L }} name="chevron-up-outline" />
                            : <Icon style={{ fontSize: fontSize.L }} name="chevron-down-outline" />}
                        </View>
                      )}
                      renderContent={(item: any) => (
                          item.content == 'datetime' ?
                            <DateTime 
                              dateOrder={dateOrder}
                              onSetDateOrder={(dateOrder) => setDateOrder(dateOrder)}/>
                            :<AddressForm 
                              streetName = {item.content == 'origin' ? streetNameOrigin : streetNameDestination}
                              streetNumber = {item.content == 'origin' ? streetNumberOrigin : streetNumberDestination}
                              doorNumber = {item.content == 'origin' ? doorNumberOrigin : doorNumberDestination}
                              onSetStreetName={(streetName) => {
                                item.content == 'origin' ?
                                  setStreetNameOrigin(streetName)
                                  : setStreetNameDestination(streetName)
                              }}
                              onSetStreetNumber={(streetNumber) => {
                                item.content == 'origin' ?
                                setStreetNumberOrigin(streetNumber)
                                  : setStreetNumberDestination(streetNumber)
                              }}
                              onSetDoorNumber={(doorNumber) => {
                                item.content == 'origin' ?
                                setDoorNumberOrigin(doorNumber)
                                  : setDoorNumberDestination(doorNumber)
                              }}/>
                      )} />
                </View>
                <View style={[styles.containerbutton, { 
                  bottom: (deviceHeight - draggableRange.top) + 20,
                  left: (deviceWidth * 0.1) / 2
                }]}>
                  <Button 
                    // @ts-ignore
                    style={styles.button}
                    onPress={() => onNextScreen({ 
                      originAddress: {
                        streetName: streetNameOrigin, 
                        streetNumber: streetNumberOrigin, 
                        doorNumber: doorNumberOrigin 
                      },
                      destinationAddress: {
                        streetName: streetNameDestination, 
                        streetNumber: streetNumberDestination, 
                        doorNumber: doorNumberDestination 
                      },
                    }, dateOrder)}>
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
              </Form>
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
  accordion: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center" ,
    backgroundColor: color.blue.lightBlue
  },
  viewText: {
    paddingVertical: 5,
  },
  form: {
    flex: 1,
    width: '95%',
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

export default SlidingPanelAddress;