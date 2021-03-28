import { Button, Form, Icon, Input, Item, Label, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Platform, Animated, StyleSheet,
  useWindowDimensions, View
} from 'react-native';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';

const ios = Platform.OS === 'ios';

type MyProps = {
  onNextScreen: (address) => void,
}
const SlidingPanelAddress: React.FunctionComponent<MyProps> = ({ onNextScreen }) => {
  const deviceHeight = useWindowDimensions().height;
  const deviceWidth = useWindowDimensions().width;
  const draggableRange = {
    top: deviceHeight * 0.9,
    bottom: deviceHeight * 0.15
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
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [doorNumber, setDoorNumber] = useState('');

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
            {/* <ScrollView
                scrollEnabled={scrollEnabled}
                showsVerticalScrollIndicator={false}
                bounces={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
            > */}
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
                      Complete los datos con la dirección que seleccionó en el mapa:
                    </Text>
                    : 
                    <Text style={{ textAlign: 'center' }}>
                      Y a continuación levante este panel hacia arriba.
                    </Text>
                  }
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <View style={{ flex: 3 }}>
                    <Item floatingLabel>
                      <Label>Calle (*)</Label>
                      <Input
                        onChangeText={streetName => setStreetName(streetName)}
                        returnKeyType='next'
                        // @ts-ignore
                        onSubmitEditing={() => { secondTextInputRef.current._root.focus(); }}
                        blurOnSubmit={false}
                        value={streetName}/>
                    </Item>
                    <Item floatingLabel last>
                      <Label>Numero (*)</Label>
                      <Input 
                        getRef={(input) => { secondTextInputRef.current = input; }}
                        onChangeText={streetNumber => setStreetNumber(streetNumber)}
                        returnKeyType='next'
                        // @ts-ignore
                        onSubmitEditing={() => { thirdTextInputRef.current._root.focus(); }}
                        blurOnSubmit={false}
                        value={streetNumber}/>
                    </Item>
                    <Item floatingLabel last>
                      <Label>Apto.</Label>
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
                      onPress={() => onNextScreen({streetName, streetNumber, doorNumber})}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                            Siguiente
                        </Text>
                    </Button>
                  </View>
                </View>
              </Form>
            {/* </ScrollView> */}
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

export default SlidingPanelAddress;