import Spacer from '@/components/Spacer'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Stats = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Spacer />
      <Text>Add</Text>
    </SafeAreaView>
  )
}

export default Stats

const styles = StyleSheet.create({})