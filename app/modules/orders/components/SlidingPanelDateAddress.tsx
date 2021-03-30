import { Accordion, Button, Form, Icon, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Platform, Animated, StyleSheet,
  useWindowDimensions, View,
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import AddressForm from './AddressForm';
import DateTime from './DateTime';
import moment from "moment";
import 'moment/min/locales';

const ios = Platform.OS === 'ios';

type MyProps = {
  onNextScreen: (address, date) => void,
}
const SlidingPanelAddress: React.FunctionComponent<MyProps> = ({ onNextScreen }) => {
  const deviceHeight = useWindowDimensions().height;
  const deviceWidth = useWindowDimensions().width;
  const draggableRange = {
    // top: deviceHeight * 0.9,
    top: deviceHeight * 0.97,
    bottom: deviceHeight * 0.15
  };

  const snappingPoints = [
    draggableRange.top,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const [atTop, setAtTop] = useState(false);
  const [panelPositionVal, setPanelPositionVal] = useState(new Animated.Value(draggableRange.bottom));
  const [streetNameOrigin, setStreetNameOrigin] = useState('');
  const [streetNumberOrigin, setStreetNumberOrigin] = useState('');
  const [doorNumberOrigin, setDoorNumberOrigin] = useState('');
  const [streetNameDestination, setStreetNameDestination] = useState('');
  const [streetNumberDestination, setStreetNumberDestination] = useState('');
  const [doorNumberDestination, setDoorNumberDestination] = useState('');
  const [dateOrder, setDateOrder] = useState<string>(moment(new Date()).format("YYYYMMDDHHmm"));

  const dataArray = [
    { title: "Dirección Origen 🔴", content: "origin" },
    { title: "Dirección Destino 🔵", content: "destination" },
    { title: "Fecha y hora", content: "datetime" },
  ];
  
  const PANEL_VELOCITY = ios ? 2 : 2.3;
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
        containerStyle={{ zIndex: 10, elevation: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
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
                      Complete los datos con las direcciones que seleccionó en el mapa:
                    </Text>
                    : 
                    <Text style={{ textAlign: 'center' }}>
                      Y a continuación levante este panel hacia arriba.
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
                        <View style={{
                          flexDirection: "row",
                          padding: 12,
                          justifyContent: "space-between",
                          alignItems: "center" ,
                          backgroundColor: "#A9DAD6" }
                        }>
                          <Text style={{ fontWeight: "600" }}>
                            {" "}{item.title}
                          </Text>
                          {expanded
                            ? <Icon style={{ fontSize: 18 }} name="chevron-up-outline" />
                            : <Icon style={{ fontSize: 18 }} name="chevron-down-outline" />}
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
                <View style={[styles.button, { 
                  bottom: (deviceHeight - draggableRange.top) + 20,
                  left: (deviceWidth * 0.1) / 2
                }]}>
                  <Button 
                    // @ts-ignore
                    style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}
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
                      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                          Siguiente
                      </Text>
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
  viewText: {
    paddingVertical: 5,
  },
  form: {
    flex: 1,
    width: '95%',
  },
  button: {
    zIndex: 9,
    elevation: 7,
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
  },
});

export default SlidingPanelAddress;