import { Button, Form, Icon, Input, Item, Label, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Platform, Animated, StyleSheet,
  useWindowDimensions, View, ActivityIndicator
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';

const ios = Platform.OS === 'ios';

type MyProps = {
  onPress: (paymentMethod) => void,
  closeSlidingPanel: any,
  openSlidingPanel: any,
  isLoading: boolean,
}
const SlidingPanelCreatePaymentMethod: React.FunctionComponent<MyProps> = ({ onPress, closeSlidingPanel, openSlidingPanel, isLoading }) => {
  const deviceHeight = useWindowDimensions().height;
  const deviceWidth = useWindowDimensions().width;
  const draggableRange = {
    top: deviceHeight * 0.8,
    bottom: 0
  };

  const snappingPoints = [
    draggableRange.top,
    deviceHeight / 2,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const firstTextInputRef = useRef<Input | null>(null);
  const secondTextInputRef = useRef<Input | null>(null);
  const thirdTextInputRef = useRef<Input | null>(null);
  const [atTop, setAtTop] = useState(false);
  const [panelPositionVal, setPanelPositionVal] = useState(new Animated.Value(draggableRange.bottom));
  const [creditCard, setCreditCard] = useState('');
  const [exp, setExp] = useState('');
  const [doorNumber, setDoorNumber] = useState('');

  closeSlidingPanel(() => {
    // @ts-ignore
    panelRef.current.show(hideFullScreenPanelOptions);
    // @ts-ignore
    firstTextInputRef.current._root.clear();
    // @ts-ignore
    secondTextInputRef.current._root.clear();
    // @ts-ignore
    thirdTextInputRef.current._root.clear();
  });

  openSlidingPanel(() => {
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

    if (value === top) {
      setAtTop(true);
    }
    if (value === bottom) {
      setAtTop(false);
    }
  }

  const onCreatePaymentMethod = () => {
    onPress({creditCard, exp, doorNumber});
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
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <View style={{ flex: 3 }}>
                    <Item floatingLabel>
                      <Label>Tarjeta de crédito</Label>
                      <Input
                        getRef={(input) => { firstTextInputRef.current = input; }}
                        onChangeText={creditCard => setCreditCard(creditCard)}
                        returnKeyType='next'
                        // @ts-ignore
                        onSubmitEditing={() => { secondTextInputRef.current._root.focus(); }}
                        blurOnSubmit={false}
                        value={creditCard}/>
                    </Item>
                    <Item floatingLabel last>
                      <Label>Expiración</Label>
                      <Input 
                        getRef={(input) => { secondTextInputRef.current = input; }}
                        onChangeText={exp => setExp(exp)}
                        returnKeyType='next'
                        // @ts-ignore
                        onSubmitEditing={() => { thirdTextInputRef.current._root.focus(); }}
                        blurOnSubmit={false}
                        value={exp}/>
                    </Item>
                    <Item floatingLabel last>
                      <Label>Otra cosa</Label>
                      <Input 
                        getRef={(input) => { thirdTextInputRef.current = input; }}
                        onChangeText={doorNumber => setDoorNumber(doorNumber)}
                        returnKeyType='done'
                        // onSubmitEditing={() => onNextScreen({streetName, streetNumber, doorNumber})}
                        value={doorNumber}/>
                    </Item>
                  </View>
                  <View style={[styles.button, { 
                    bottom: (deviceHeight - draggableRange.top) + 20,
                    left: (deviceWidth * 0.1) / 2
                  }]}>
                    <Button 
                      // @ts-ignore
                      style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}
                      onPress={onCreatePaymentMethod}>
                        {
                            isLoading ?
                              <ActivityIndicator />
                            :
                              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                  Crear método de pago
                              </Text>
                        }
                    </Button>
                  </View>
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
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
  },
  viewText: {
    paddingVertical: 10,
  },
  form: {
    flex: 1,
    width: '95%',
    // paddingTop: 10,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  button: {
    zIndex: 9,
    elevation: 7,
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
  },
});

export default SlidingPanelCreatePaymentMethod;