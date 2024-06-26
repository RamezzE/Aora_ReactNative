import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from 'react'
import { icons } from '../constants'

export const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {

  return (

      <View
        className = 'border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center space-x-4'
      >
        <TextInput 
            className = 'flex-1 text-white text-base mt-0.5 font-pregular'
            value = {value}
            placeholder = {placeholder}
            placeholderTextColor = '#7b7b8b'
            onChangeText = {handleChangeText}
        />

        <TouchableOpacity>
            <Image
                source = {icons.search}
                className = 'w-5 h-5'
                resizeMode = 'contain'
            />
        </TouchableOpacity>
      </View>
  );
};
