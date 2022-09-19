import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import { useState } from "react";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
//modals overlay the main screen and take some action after they dissapear 
//ScrollView gives you a viw or container which will be scrollable
// in this course we only use functional components
//App JS is the root component , any interface must go into app component or children of this component
//text and view are built in react-native codqe : you cant use h2 or div
//view is used to hold other components not text
//our app has two states courseGoals and enteredGoalText

export default function App() {
  //managing a list of goals - data that changes dynamically
  //initialized with an empty array since its a list
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible,setModalIsVisible] = useState(false); //initially modal shouldnt be visible and should change when button is clicked
  //so our goals are saved in courseGoals as a state - setCourseGoals is the name of the function that updates our state CourseGoals

  function startAddGoalHandler(){
    setModalIsVisible(true);
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals)=>{
      return currentCourseGoals.filter((goal)=> goal.id!== id) // returns true if theres no match , because i want to keep items with no match - if ids are equal this item will be dropped
    })
  }

  //if the goal id is not equal , it will return true ,it will keep items  if theres no match 
  //instead of enteredText as a plain string , i will wrap it into a object
  //if your new state depends on the old state and in our case it does because we create add a goal to a list and want to update the list
  //setCourseGoals([...courseGoals,enteredGoalText]);
  // a better way is to provide a function which automatically receives the current state
  // for dynamic lists - scrollview is not so good because of performance if our list is uber long
  // another type of component list scrolling - its called FlatList - used for rendering the only the items that are visible - all the items that arent there are lazily loaded
  // we call it itemData also contains some meta data and not just the item - it also gives us access to index. ItemData also has the actual item or data value that we hold
  //there are two ways to create keys with flat lists , turn primitive values to object values
  //if you want to style your onw button you have to buld your own one using Pressable
  return (
    <>
      <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <Button title='Add New Goal' 
        color="#a065ec" 
        onPress={startAddGoalHandler}/>
      
      {<GoalInput 
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}/>}
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem 
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}/>
              );
            }}
            //automatically calls for every list item rendered
            //simply called to get a key for every item , under the hood the key is returned for every item
            //instead of using key in my handler - sometimes if you work with an API , you will need to transform your key , if you dont want to do that you can use a keyextravtor instead
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
     </>
     );
}
//The outer view controls how much space the area of the screen takes up , and the scroll view makes sure the items inside the view are scrollable.
//justify content
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
