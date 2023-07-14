import React from 'react';
import { useNavigation } from '@react-navigation/native';
import DATA from './Language/Data';

export default function Rate({ index }) {
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate(DATA[index].DrawerNavigatorMainpage);
    });
    return unsubscribe;
  }, [navigation, index]);

  return null; // Компонент не містить відображення
}
