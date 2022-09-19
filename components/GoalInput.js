import {StyleSheet, View, TextInput,Button, Modal, Image} from 'react-native';
import {useState} from 'react';

function GoalInput(props){
    const [enteredGoalText, setEnteredGoalText] = useState(''); //initialized as empty string
    
    function goalInputHandler(enteredText) {
        //updates state
        //responsible for fetching user input as the user types
        setEnteredGoalText(enteredText);
      }
    
    function addGoalHandler(){
      props.onAddGoal(enteredGoalText);
      setEnteredGoalText('');
    }
    
    
    return(
      <Modal visible={props.visible} animationType="fade">
        <View style={styles.inputContainer}>
        <Image style={styles.image} source={require('../assets/images/goal.png')}/>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
           <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282"/>
          </View>
          
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
          </View>
        </View>
      </View>
      </Modal>
     
       
    );

}

const styles=StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: "#e4d0ff",
        width: "100%",
        borderRadius: 6,
        marginRight: 8,
        padding: 16,
        color:'#120438',
        backgroundColor: '#e4d0ff'
      },
    inputContainer: {
        backgroundColor: '#311b6b',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    image:{
      width:100,
      height: 100,
      margin: 20
    },
    buttonContainer:{
      flexDirection: 'row',
      marginTop : 16
    },
    button: {
      width: 100,
      marginHorizontal: 8
    }
});
export default GoalInput;