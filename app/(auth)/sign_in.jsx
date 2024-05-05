import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const validateSignIn = (email, password) => {
  var result = {
    success: false,
    errorMsg: ''
  }

  if (!email || !password) {
     result.errorMsg = 'Please fill in all the fields'
     return result
  }

  var emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  if(!emailRegex.test(email)) {
    result.errorMsg =  'Please write a valid email'
    return result
  }

  result.success = true
  return result
}

const SignIn = () => {
  const [form, setForm] = useState({
    email : '',
    password : ''
  })

  const [isSubmitting, setisSubmitting] = useState()

  const submit = async () => {

    var result = validateSignIn(form.email, form.password)

    if(!result.success) {
      Alert.alert('Error', result.errorMsg)
      return
    }

    setisSubmitting(true)

    try {
      const result = await signIn(form.email, form.password);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }


  return (
   <SafeAreaView
    className = 'bg-primary h-full'
   >
    <ScrollView>
      <View
        className = 'w-full justify-center min-h-[87.5vh] px-4 my-6'
      >
       <Image 
        source = { images.logo }
        resizeMode = 'contain'
        className = 'w-[115px] h-[35px]'
       />

       <Text
        className = 'text-2xl text-white text-semibold mt-10 font-psemibold'
       >
        Log in to Aora
       </Text>

       <FormField 
          title = 'Email'
          value = {form.email}
          handleChangeText = {(e) => setForm({ ...form, email: e})}
          otherStyles = 'mt-7'
          keyboardType = 'email-address'
       />

       <FormField 
          title = 'Password'
          value = {form.password}
          handleChangeText = {(e) => setForm({ ...form, password: e})}
          otherStyles = 'mt-7'
       />

       <CustomButton 
        title = 'Sign In'
        handlePress = {submit}
        containerStyles = 'mt-7'
        isLoading = {isSubmitting}
       />

       <View className = 'justify-center pt-5 flex-row gap-2'>
        <Text className = 'text-lg text-gray-100 font-pregular'>
          Don't have an account?
        </Text>
        <Link href='/sign_up' className = 'text-lg font-psemibold text-secondary'>Sign Up</Link>
       </View>

      </View>
    </ScrollView>

   </SafeAreaView>
  )
}

export default SignIn