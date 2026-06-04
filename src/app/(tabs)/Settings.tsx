import Spacer from '@/components/Spacer'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Spacer />
      <Text>Settings</Text>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({})