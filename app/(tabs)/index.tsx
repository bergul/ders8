import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [urunler, setUrunler] = useState([]);
  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
      setUrunler(response.data.products);
    })// response.data içerisinde gelen verileri setUrunler fonksiyonu ile urunler state'ine atıyoruz.
  }, []);
  return (
    <View>
      <FlatList data={urunler} renderItem={({ item }) => (
        <View style={styles.stepContainer}>
          <ThemedText>{item.title}</ThemedText>
          <ThemedText>{item.price}</ThemedText>
          <ThemedText>{item.description}</ThemedText>
        </View>
      )} keyExtractor={(urun) => urun.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
