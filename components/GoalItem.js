import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  //helper function to fetch id
  return (
      <View style={styles.goalItem}>
        <Pressable android_ripple={{color:'#dddddd'}}onPress={props.onDeleteItem.bind(this, props.id)} 
        style={({pressed})=>pressed && styles.pressedItem}> 
    
        <Text style={styles.goalText}>{props.text}</Text>
         </Pressable> 
      </View>
   
  );
}
//style prop - ios needs style prop which works with a function in a object , which is called auto by pressable whenever the state press changes , you can use object destructuring to get a hold of the press state
// pressed && styes : we return pressed if its true we return pressedItem otherwise you dont return any styling 
export default GoalItem;

//styles should also be brought here

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#5e0acc",
    padding: 8,
    borderRadius: 15,
    margin: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
