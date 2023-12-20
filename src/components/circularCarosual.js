import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
const Circular = () => {
  const images = [
    { id: '1', source: { uri: 'https://placekitten.com/200/150'}, text: "Find your personality"  },
    { id: '2', source: { uri: 'https://placekitten.com/201/150'},text: "Build wealth in 24K gold"  },
    { id: '3', source: { uri: 'https://placekitten.com/202/150'}, text: "Track your spends"  },
    { id: '4', source: { uri: 'https://placekitten.com/203/150'}, text: "Try our investing AI"  },
    { id: '5', source: { uri: 'https://placekitten.com/204/150'}, text: "Build wealth in 24K gold"  },
    { id: '6', source: { uri: 'https://placekitten.com/205/150'}, text: "Track your spends"  },
    { id: '7', source: { uri: 'https://placekitten.com/206/150'}, text: "Find your personality"  },
    { id: '8', source: { uri: 'https://placekitten.com/207/150'}, text: "Try our investing AI"   },
    { id: '9', source: { uri: 'https://placekitten.com/208/150'}, text: "Track your spends"  },
    { id: '10', source: { uri: 'https://placekitten.com/209/150'},text: "Find your personality"},
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {images.map(item => (
        <View key={item.id}>
          <Image key={item.id} source={item.source} style={styles.image} />
          <Text style={{color: '#000', fontSize:11, width:80, textAlign:'center', left:6 }}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 80, 
    height: 80,
    marginHorizontal: 15, 
    borderRadius: 40,
    borderWidth: 0.8,
    borderColor: '#000',
  },
});

export default Circular;
