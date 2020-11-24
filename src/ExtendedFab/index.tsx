import React from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, Image } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const penIcon = require('./pen.png');

const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

const ExtendedFab = () => {
  const [offset, setOffset] = React.useState(0);
  const isExtended = useSharedValue(false);

  const outerAnimStyles = useAnimatedStyle(() => {
    if (isExtended.value) {
      return {
        width: withTiming(56, { duration: 120 }),
      };
    } else {
      return {
        width: withTiming(150, { duration: 120 }),
      };
    }
  });

  const innerAnimStyles = useAnimatedStyle(() => {
    if (isExtended.value) {
      return {
        transform: [{ translateX: withTiming(26, { duration: 120 }) }],
      };
    } else {
      return {
        transform: [{ translateX: withTiming(0, { duration: 120 }) }],
      };
    }
  });

  const textAnimStyle = useAnimatedStyle(() => {
    if (isExtended.value) {
      return {
        opacity: withTiming(0, { duration: 80 }),
      };
    } else {
      return {
        opacity: withTiming(1, {
          duration: 400,
        }),
      };
    }
  });

  const renderItem = ({ item }) => <Text style={styles.item}>{item}</Text>;
  return (
    <SafeAreaView style={styles.safearea}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const {
            contentOffset,
            contentSize,
            layoutMeasurement,
          } = e.nativeEvent;
          const currOffset = contentOffset.y;
          const contentSizeHeight = contentSize.height;
          const layoutSizeHeight = layoutMeasurement.height;

          const maxOffset = contentSizeHeight - layoutSizeHeight;
          if (currOffset >= 0 && currOffset <= maxOffset) {
            if (currOffset > offset) {
              if (currOffset > offset + 100 || currOffset === maxOffset) {
                setOffset(currOffset);
                isExtended.value = true;
              }
            } else {
              if (currOffset < offset - 100 || currOffset === 0) {
                setOffset(currOffset);
                isExtended.value = false;
              }
            }
          }
        }}
      />
      <Animated.View style={[styles.fabOuter, outerAnimStyles]}>
        <Animated.View style={[styles.fabInner, innerAnimStyles]}>
          <Image source={penIcon} style={styles.image} />
          <Animated.Text
            style={[styles.fabText, textAnimStyle]}
            numberOfLines={1}>
            CREATE
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },

  item: {
    padding: 40,
    marginBottom: 20,
    fontSize: 20,
  },

  fabOuter: {
    borderRadius: 28,
    height: 56,
    width: 56,

    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,

    position: 'absolute',
    bottom: 40,
    right: 30,

    elevation: 10,

    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 5 },
  },
  fabInner: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  image: {
    height: 20,
    width: 20,
  },
});
export default ExtendedFab;
