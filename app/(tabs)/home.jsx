import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { SearchInput } from '../../components/SearchInput'
import { Trending } from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { useState, useEffect } from 'react'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {

  const { data: posts, refetch } = useAppwrite(getAllPosts)


  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  console.log()

  return (
    <SafeAreaView className = 'bg-primary h-full'>
      <FlatList 
        data = {posts}
        keyExtractor = {(item) => item.$id}
        renderItem = {({ item }) => (
          <VideoCard 
            video = {item}
          />
        )}
        ListHeaderComponent={() => (
          <View className = 'my-6 px-4 space-y-6'>
            <View className = 'justify-between items-start flex-row mb-6'>
              <View>
                <Text className = 'font-pmedium text-sm text-gray-100'>Welcome Back</Text>
                <Text className = 'text-2xl font-psemibold text-white'>Ramouza</Text>
              </View>
              <View>
                <Image
                  className = 'w-9 h-10' 
                  source = {images.logoSmall}
                  resizeMode = 'contain'
                />
              </View>
            </View>
            
            <SearchInput 
              placeholder = 'Search for a video topic'
              // handleChangeText = 
              otherStyles = ''
              
            />

            <View className = 'w-full flex-1 '>
              <Text className = 'text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>
              <Trending 
                posts = {[{id: 1}, {id: 2}] ?? {}}
              />
            </View>
          </View>
        )}
        ListEmptyComponent = {() => (
          <EmptyState 
            title = 'No Videos Found'
            subtitle = 'Be the first one to upload a video'
          />
        )}
        refreshControl = {
          <RefreshControl 
            refreshing = {refreshing}
            onRefresh = {onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home