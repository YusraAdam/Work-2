// Import necessary components and libraries
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TypeDetails = ({ type }) => (
  <View style={styles.typeDetailContainer}>
    <Image source={type.image} style={styles.typeDetailImage} />
    <Text style={styles.typeDetailName}>{type.name}</Text>
    {/* Add more details or customization based on your requirements */}
  </View>
);

const TypeDetail = () => {
  const route = useRoute();
  const { typesData } = route.params;

  return (
    <View style={styles.container}>
      {typesData.map((type) => (
        <TypeDetails key={type.id} type={type} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  typeDetailContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  typeDetailImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  typeDetailName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TypeDetail;
